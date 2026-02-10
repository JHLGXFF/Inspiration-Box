## ADDED Requirements

### Requirement: User can select image files for upload

The system SHALL allow users to select one or more image files from their device for uploading as inspiration attachments.

#### Scenario: User selects valid image file
- **WHEN** user clicks the image upload button and selects a PNG, JPG, JPEG, GIF, or WebP file
- **THEN** system accepts the file and displays a preview thumbnail

#### Scenario: User selects invalid image format
- **WHEN** user attempts to select a file with an unsupported image format
- **THEN** system rejects the file and displays an error message indicating supported formats

#### Scenario: User selects oversized image
- **WHEN** user selects an image file larger than 10MB
- **THEN** system rejects the file and displays an error message indicating the maximum file size

### Requirement: User can select video files for upload

The system SHALL allow users to select video files from their device for uploading as inspiration attachments.

#### Scenario: User selects valid video file
- **WHEN** user clicks the video upload button and selects an MP4, WebM, or MOV file
- **THEN** system accepts the file and displays a preview thumbnail or first frame

#### Scenario: User selects invalid video format
- **WHEN** user attempts to select a file with an unsupported video format
- **THEN** system rejects the file and displays an error message indicating supported formats

#### Scenario: User selects oversized video
- **WHEN** user selects a video file larger than 50MB
- **THEN** system rejects the file and displays an error message indicating the maximum file size

### Requirement: User can drag and drop files for upload

The system SHALL support drag-and-drop functionality for uploading image and video files.

#### Scenario: User drags valid media file
- **WHEN** user drags an image or video file over the upload area
- **THEN** system highlights the drop zone to indicate it can accept the file

#### Scenario: User drops valid media file
- **WHEN** user drops a valid image or video file in the upload area
- **THEN** system processes the file and displays a preview, same as if selected via file picker

#### Scenario: User drags invalid file type
- **WHEN** user drags an unsupported file type over the upload area
- **THEN** system does not highlight the drop zone

### Requirement: System validates file type and size before upload

The system SHALL validate file type and size on the client side before initiating upload.

#### Scenario: Validation passes
- **WHEN** user selects a valid file within size limits
- **THEN** system enables the upload button and shows file details (name, size, type)

#### Scenario: Validation fails
- **WHEN** user selects an invalid or oversized file
- **THEN** system prevents upload, disables the upload button, and displays specific error message

### Requirement: System shows upload progress

The system SHALL display upload progress when transferring media files to the server.

#### Scenario: Upload in progress
- **WHEN** user initiates upload of a media file
- **THEN** system displays a progress bar showing percentage completed

#### Scenario: Upload completes successfully
- **WHEN** media file upload reaches 100% and server confirms receipt
- **THEN** system removes progress indicator and displays success message

#### Scenario: Upload fails
- **WHEN** upload is interrupted by network error or server rejection
- **THEN** system displays error message and allows user to retry

### Requirement: User can upload multiple media files to one inspiration

The system SHALL allow attaching multiple image and/or video files to a single inspiration memo.

#### Scenario: User adds multiple images
- **WHEN** user selects or drops multiple image files for one inspiration
- **THEN** system accepts all valid files and displays preview thumbnails for each

#### Scenario: User adds mixed media types
- **WHEN** user selects both image and video files for one inspiration
- **THEN** system accepts all valid files and displays appropriate previews for each media type

#### Scenario: User exceeds attachment limit
- **WHEN** user attempts to add more than 10 media files to one inspiration
- **THEN** system rejects additional files and displays a message indicating the maximum attachment limit
