import React from "react";
import axios from "../app/axios";

export default class UploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadMessage: false
        };
        this.uploadImage = this.uploadImage.bind(this);
    }
    async uploadImage(event) {
        const { updateImage, hideUploadOption } = this.props;
        this.setState({ uploadMessage: true });
        try {
            const userImage = await event.target.files[0];
            let formData = new FormData();
            formData.append("file", userImage);
            const results = await axios.post("/api/upload-image", formData);
            updateImage(results.data.image);
            hideUploadOption();
        } catch (error) {
            console.log(
                "error on user-profile-upload-image inside uploadImage in axios post /api/upload-image: ",
                error
            );
        }
    }
    render() {
        return (
            <div className="upload-image-container">
                <div
                    onClick={this.props.hideUploadOption}
                    className="upload-image-closer"
                >
                    <p>X</p>
                </div>
                <p className="upload-image-copy">
                    Want to change your profile image?
                </p>
                <input
                    onChange={this.uploadImage}
                    name="file"
                    type="file"
                    accept="image/*"
                    className="upload-image-input"
                />
                {this.state.uploadMessage && <p>Image is being uploaded...</p>}
            </div>
        );
    }
}
