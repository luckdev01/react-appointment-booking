import React from "react";
import ProfileImage from "./user-profile-display-image";
import EditInformation from "./user-profile-edit";

export default function UserProfile({
    forename,
    surname,
    image,
    showUploadOption,
    displaySize,
    krankenkasseName,
    krankenkasseType,
    patientSurgery,
    patientHospital,
    patientMedication,
    patientDisease,
    patientImportant,
    patientHistory,
    patientRecommendations,
    updateKrankenkasseName,
    updateKrankenkasseType,
    updatePatientSurgery,
    updatePatientHospital,
    updatePatientMedication,
    updatePatientDisease,
    updatePatientImportant
}) {
    return (
        <div>
            <div>
                <h1>
                    Profile of {forename} {surname}
                </h1>
            </div>
            <p>
                Please add a picture of yourself. This makes it possible for our
                staff to welcome you in our office.
            </p>
            <div>
                <ProfileImage
                    displaySize={displaySize}
                    forename={forename}
                    surname={surname}
                    image={image}
                    showUploadOption={showUploadOption}
                />

                <p>
                    We would like to provide the best care possible. For this
                    reason we will ask a few questions before your first
                    appointment. You can answer them during your first visit in
                    our office or you can save time by editing your profile
                    below:
                </p>
            </div>
            <div>
                <EditInformation
                    krankenkasseName={krankenkasseName}
                    krankenkasseType={krankenkasseType}
                    patientSurgery={patientSurgery}
                    patientHospital={patientHospital}
                    patientMedication={patientMedication}
                    patientDisease={patientDisease}
                    patientImportant={patientImportant}
                    patientHistory={patientHistory}
                    patientRecommendations={patientRecommendations}
                    updateKrankenkasseName={updateKrankenkasseName}
                    updateKrankenkasseType={updateKrankenkasseType}
                    updatePatientSurgery={updatePatientSurgery}
                    updatePatientHospital={updatePatientHospital}
                    updatePatientMedication={updatePatientMedication}
                    updatePatientDisease={updatePatientDisease}
                    updatePatientImportant={updatePatientImportant}
                />
            </div>
        </div>
    );
}
