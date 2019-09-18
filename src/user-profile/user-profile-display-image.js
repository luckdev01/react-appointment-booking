import React from "react";

export default function ProfileImage({
    forename,
    surname,
    image,
    showUploadOption,
    displaySize
}) {
    return (
        <div className="user-image-icon">
            <img
                width={displaySize}
                height={displaySize}
                onClick={showUploadOption}
                src={image}
                alt={`${forename} ${surname}`}
                className="user-image"
            />
            <img
                onClick={showUploadOption}
                src="https://static.thenounproject.com/png/625182-200.png"
                className="user-upload-icon"
            />
        </div>
    );
}
