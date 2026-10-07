import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
// ===============================
// SUPABASE CONFIGURATION
// ===============================
const SUPABASE_URL = "https://ybapswllwfaiiailgmsw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_h-7SnGjr8G8ieshdahYglw_OIYW0iSe";
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
// ===============================
// WEBSITE FUNCTIONS
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    // --------------------------------
    // MOBILE MENU
    // --------------------------------
    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");
    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            navigation.classList.toggle("active");
            if (navigation.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }
        });
        const links = navigation.querySelectorAll("a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("active");
                menuToggle.textContent = "☰";
            });
        });
    }
    // --------------------------------
    // CONTACT FORM
    // --------------------------------
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const name =
                document.getElementById("name")?.value.trim();
            const email =
                document.getElementById("email")?.value.trim();
            const subject =
                document.getElementById("subject")?.value.trim();
            const message =
                document.getElementById("message")?.value.trim();
            if (!name || !email || !subject || !message) {
                if (formMessage) {
                    formMessage.textContent =
                        "Please complete all fields.";
                }
                return;
            }
            if (formMessage) {
                formMessage.textContent =
                    "Thank you. Your message has been received.";
            }
            contactForm.reset();
        });
    }
    // --------------------------------
    // PASSPORT PHOTO PREVIEW
    // --------------------------------
    const passportPhoto =
        document.getElementById("passportPhoto");
    const passportPreview =
        document.getElementById("passportPreview");
    const passportPreviewContainer =
        document.querySelector(".passport-preview-container");
    if (passportPhoto) {
        passportPhoto.addEventListener("change", function () {
            const file = passportPhoto.files[0];
            if (!file) {
                if (passportPreviewContainer) {
                    passportPreviewContainer.style.display = "none";
                }
                return;
            }
            // Check file type
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file.");
                passportPhoto.value = "";
                if (passportPreviewContainer) {
                    passportPreviewContainer.style.display = "none";
                }
                return;
            }
            // Maximum size: 5 MB
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                alert(
                    "The passport picture is too large. Please choose an image smaller than 5 MB."
                );
                passportPhoto.value = "";
                if (passportPreviewContainer) {
                    passportPreviewContainer.style.display = "none";
                }
                return;
            }
            // Show preview
            const reader = new FileReader();
            reader.onload = function (event) {
                if (passportPreview) {
                    passportPreview.src =
                        event.target.result;
                }
                if (passportPreviewContainer) {
                    passportPreviewContainer.style.display =
                        "block";
                }
            };
            reader.readAsDataURL(file);
        });
    }
    // --------------------------------
    // SCOUT APPLICATION FORM
    // --------------------------------
    const applicationForm =
        document.getElementById("scoutApplicationForm");
    const applicationMessage =
        document.getElementById("applicationMessage");
    const submitButton =
        document.getElementById("submitApplication");
    if (applicationForm) {
        applicationForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            // Prevent multiple submissions
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent =
                    "Submitting...";
            }
            // Clear previous message
            if (applicationMessage) {
                applicationMessage.textContent = "";
                applicationMessage.className =
                    "application-message";
            }
            // --------------------------------
            // GET FORM VALUES
            // --------------------------------
            const fullName =
                document.getElementById("applicantFullName")
                    ?.value.trim();
            const dateOfBirth =
                document.getElementById("dateOfBirth")
                    ?.value;
            const gender =
                document.getElementById("gender")
                    ?.value;
            const phone =
                document.getElementById("applicantPhone")
                    ?.value.trim();
            const email =
                document.getElementById("applicantEmail")
                    ?.value.trim();
            const residentialAddress =
                document.getElementById("residentialAddress")
                    ?.value.trim();
            const parentGuardianName =
                document.getElementById("guardianName")
                    ?.value.trim();
            const parentGuardianPhone =
                document.getElementById("guardianPhone")
                    ?.value.trim();
            const emergencyContactName =
                document.getElementById("emergencyName")
                    ?.value.trim();
            const emergencyContactPhone =
                document.getElementById("emergencyPhone")
                    ?.value.trim();
            const emergencyContactRelationship =
                document.getElementById("emergencyRelationship")
                    ?.value.trim();
            const scoutSection =
                document.getElementById("scoutSection")
                    ?.value;
            const previousExperienceElement =
                document.querySelector(
                    'input[name="previous_scout_experience"]:checked'
                );
            const previousScoutExperience =
                previousExperienceElement
                    ? previousExperienceElement.value === "true"
                    : false;
            const previousScoutDetails =
                document.getElementById("previousScoutDetails")
                    ?.value.trim();
            const reasonForJoining =
                document.getElementById("reasonForJoining")
                    ?.value.trim();
            const additionalInformation =
                document.getElementById("additionalInformation")
                    ?.value.trim();
            const consent =
                document.getElementById("applicationConsent")
                    ?.checked;
            // --------------------------------
            // GET PASSPORT PHOTO
            // --------------------------------
            const photoFile =
                passportPhoto?.files[0];
            // --------------------------------
            // BASIC VALIDATION
            // --------------------------------
            if (
                !fullName ||
                !dateOfBirth ||
                !gender ||
                !phone ||
                !residentialAddress ||
                !emergencyContactName ||
                !emergencyContactPhone ||
                !emergencyContactRelationship ||
                !scoutSection ||
                !reasonForJoining ||
                !consent
            ) {
                showApplicationMessage(
                    "Please complete all required fields and accept the consent statement.",
                    "error"
                );
                resetSubmitButton();
                return;
            }
            // Passport photo required
            if (!photoFile) {
                showApplicationMessage(
                    "Please upload your passport picture before submitting your application.",
                    "error"
                );
                resetSubmitButton();
                return;
            }
            // --------------------------------
            // CHECK PHOTO
            // --------------------------------
            if (!photoFile.type.startsWith("image/")) {
                showApplicationMessage(
                    "Please upload a valid image file.",
                    "error"
                );
                resetSubmitButton();
                return;
            }
            const maxPhotoSize =
                5 * 1024 * 1024;
            if (photoFile.size > maxPhotoSize) {
                showApplicationMessage(
                    "Your passport picture must be smaller than 5 MB.",
                    "error"
                );
                resetSubmitButton();
                return;
            }
            // --------------------------------
            // UPLOAD PASSPORT PHOTO
            // --------------------------------
            try {
                /*
                 * Create a unique file name.
                 *
                 * The applicant's name is NOT used
                 * directly as the filename.
                 */
                const fileExtension =
                    photoFile.name
                        .split(".")
                        .pop()
                        .toLowerCase();
                const safeExtension =
                    ["jpg", "jpeg", "png", "webp"]
                        .includes(fileExtension)
                        ? fileExtension
                        : "jpg";
                const uniqueFileName =
                    `${crypto.randomUUID()}.${safeExtension}`;
                const filePath =
                    `applications/${uniqueFileName}`;
                const { error: uploadError } =
                    await supabase.storage
                        .from("passport-photos")
                        .upload(
                            filePath,
                            photoFile,
                            {
                                cacheControl: "3600",
                                upsert: false,
                                contentType: photoFile.type
                            }
                        );
                if (uploadError) {
                    console.error(
                        "Passport photo upload error:",
                        uploadError
                    );
                    showApplicationMessage(
                        "The passport picture could not be uploaded. Please try again.",
                        "error"
                    );
                    resetSubmitButton();
                    return;
                }
                // --------------------------------
                // SAVE APPLICATION
                // --------------------------------
                const {
                    data,
                    error
                } = await supabase
                    .from("scout_applications")
                    .insert({
                        full_name:
                            fullName,
                        date_of_birth:
                            dateOfBirth,
                        gender:
                            gender,
                        phone:
                            phone,
                        email:
                            email || null,
                        residential_address:
                            residentialAddress,
                        parent_guardian_name:
                            parentGuardianName || null,
                        parent_guardian_phone:
                            parentGuardianPhone || null,
                        emergency_contact_name:
                            emergencyContactName,
                        emergency_contact_phone:
                            emergencyContactPhone,
                        emergency_contact_relationship:
                            emergencyContactRelationship,
                        scout_section:
                            scoutSection,
                        previous_scout_experience:
                            previousScoutExperience,
                        previous_scout_details:
                            previousScoutDetails || null,
                        reason_for_joining:
                            reasonForJoining,
                        additional_information:
                            additionalInformation || null,
                        consent:
                            true,
                        passport_photo_url:
                            filePath
                    })
                    .select("application_number")
                    .single();
                // --------------------------------
                // HANDLE DATABASE ERROR
                // --------------------------------
                if (error) {
                    console.error(
                        "Supabase application error:",
                        error
                    );
                    /*
                     * If the application could not be saved,
                     * remove the uploaded photo so we don't
                     * leave an unused file in Storage.
                     */
                    await supabase.storage
                        .from("passport-photos")
                        .remove([filePath]);
                    showApplicationMessage(
                        "Sorry, your application could not be submitted. Please try again.",
                        "error"
                    );
                    resetSubmitButton();
                    return;
                }
                // --------------------------------
                // SUCCESS
                // --------------------------------
                const applicationNumber =
                    data?.application_number ||
                    "Submitted successfully";
                showApplicationMessage(
                    `Application submitted successfully! Your application number is ${applicationNumber}. Please keep this number for your records.`,
                    "success"
                );
                // Clear form
                applicationForm.reset();
                // Clear passport preview
                if (passportPreview) {
                    passportPreview.src = "";
                }
                if (passportPreviewContainer) {
                    passportPreviewContainer.style.display =
                        "none";
                }
                // Restore button
                resetSubmitButton();
            } catch (error) {
                console.error(
                    "Unexpected application error:",
                    error
                );
                showApplicationMessage(
                    "Something went wrong while submitting your application. Please check your internet connection and try again.",
                    "error"
                );
                resetSubmitButton();
            }
        });
    }
    // --------------------------------
    // APPLICATION MESSAGE
    // --------------------------------
    function showApplicationMessage(message, type) {
        if (!applicationMessage) {
            return;
        }
        applicationMessage.textContent =
            message;
        applicationMessage.className =
            "application-message " + type;
    }
    // --------------------------------
    // RESET SUBMIT BUTTON
    // --------------------------------
    function resetSubmitButton() {
        if (submitButton) {
            submitButton.disabled =
                false;
            submitButton.textContent =
                "Submit Application";
        }
    }
    // --------------------------------
    // FOOTER YEAR
    // --------------------------------
    const footerText =
        document.querySelector(".footer-bottom p");
    if (footerText) {
        footerText.textContent =
            `© ${new Date().getFullYear()} Tamale Metro Scout Council. All rights reserved.`;
    }
});