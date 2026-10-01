import { useState } from "react";
import "../styles/create.css";

function Create() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="create-page">

      <header className="create-header">
        <div>
          <p className="eyebrow">CREATE</p>
          <h1>Turn your image into ASCII art.</h1>
          <p className="subtitle">
            Upload an image and transform it into character-based artwork.
          </p>
        </div>
      </header>

      <main className="generator-workspace">

        {/* ORIGINAL IMAGE */}
        <section className="workspace-panel">
          <div className="panel-heading">
            <span>01</span>
            <h2>Original</h2>
          </div>

          {!preview ? (
            <label className="upload-area">
              <div className="upload-icon">+</div>

              <h3>Drop your image here</h3>

              <p>or choose an image from your device</p>

              <span className="choose-button">
                Choose image
              </span>

              <small>JPG · PNG · WEBP</small>

              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageChange}
                hidden
              />
            </label>
          ) : (
            <div className="image-preview">
              <img src={preview} alt="Selected preview" />

              <div className="file-info">
                <div>
                  <strong>{image.name}</strong>
                  <span>
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>

                <label className="change-image">
                  Change
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageChange}
                    hidden
                  />
                </label>
              </div>
            </div>
          )}
        </section>


        {/* ASCII OUTPUT */}
        <section className="workspace-panel">
          <div className="panel-heading">
            <span>02</span>
            <h2>ASCII Output</h2>
          </div>

          <div className="ascii-placeholder">
            <div className="ascii-symbol">
              @#*+
            </div>

            <h3>Your ASCII art will appear here</h3>

            <p>
              Upload an image and generate your result.
            </p>
          </div>
        </section>

      </main>

      <div className="generate-area">
        <button
          className="generate-button"
          disabled={!image}
        >
          Generate ASCII
          <span>✦</span>
        </button>
      </div>

    </div>
  );
}

export default Create;