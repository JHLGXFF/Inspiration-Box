## ADDED Requirements

### Requirement: System displays image thumbnails in inspiration cards

The system SHALL show thumbnail previews of attached images in the inspiration card view.

#### Scenario: Card has single image attachment
- **WHEN** inspiration card is rendered with one image attachment
- **THEN** system displays the image thumbnail within the card

#### Scenario: Card has multiple image attachments
- **WHEN** inspiration card is rendered with multiple image attachments
- **THEN** system displays all image thumbnails in a grid or carousel layout

#### Scenario: Image fails to load
- **WHEN** image thumbnail cannot be loaded (network error or missing file)
- **THEN** system displays a placeholder image or error icon

### Requirement: System displays video previews in inspiration cards

The system SHALL show video previews with play controls in the inspiration card view.

#### Scenario: Card has video attachment
- **WHEN** inspiration card is rendered with video attachment
- **THEN** system displays video first frame or thumbnail with a play icon overlay

#### Scenario: User hovers over video preview
- **WHEN** user moves cursor over video thumbnail
- **THEN** system shows play button or other visual indication that video is playable

### Requirement: User can view full-size images

The system SHALL allow users to view images in full size or enlarged view.

#### Scenario: User clicks image thumbnail
- **WHEN** user clicks on an image thumbnail in the card
- **THEN** system opens the image in a lightbox or modal showing full-size version

#### Scenario: User navigates between images in lightbox
- **WHEN** memo has multiple images and user has one open in lightbox
- **THEN** system provides navigation controls (prev/next arrows or swipe gestures) to view other images

#### Scenario: User closes full-size image view
- **WHEN** user clicks outside the image, presses ESC key, or clicks close button
- **THEN** system closes the lightbox and returns to the card view

### Requirement: User can play videos inline

The system SHALL allow users to play video attachments directly within the card or in expanded view.

#### Scenario: User clicks video play button
- **WHEN** user clicks the play icon on a video preview
- **THEN** system starts playing the video inline with standard controls (play/pause, volume, fullscreen)

#### Scenario: User pauses or stops video
- **WHEN** user clicks pause or navigates away from the card
- **THEN** system pauses the video playback

#### Scenario: Video playback fails
- **WHEN** video cannot be loaded or played due to format or network issues
- **THEN** system displays error message and provides option to download the file

### Requirement: System generates thumbnails for uploaded images

The system SHALL automatically create thumbnail versions of uploaded images for efficient display.

#### Scenario: Image is uploaded
- **WHEN** server receives an image upload
- **THEN** system generates a thumbnail (e.g., 300x300px) and saves it alongside the original

#### Scenario: Thumbnail generation fails
- **WHEN** thumbnail generation fails for an uploaded image
- **THEN** system falls back to using the original image resized on client side

### Requirement: System generates video poster images

The system SHALL create poster/thumbnail images from uploaded videos for preview display.

#### Scenario: Video is uploaded
- **WHEN** server receives a video upload
- **THEN** system extracts the first frame or a representative frame as a poster image

#### Scenario: Video poster extraction fails
- **WHEN** system cannot extract a frame from uploaded video
- **THEN** system uses a default video placeholder icon as the poster

### Requirement: Media display respects aspect ratios

The system SHALL maintain original aspect ratios when displaying images and videos to avoid distortion.

#### Scenario: Wide image is displayed
- **WHEN** image with wide aspect ratio (e.g., 16:9) is shown in card
- **THEN** system scales the image to fit container width while preserving aspect ratio

#### Scenario: Portrait image is displayed
- **WHEN** image with tall aspect ratio is shown in card
- **THEN** system scales the image to fit container while preserving aspect ratio

### Requirement: System supports lazy loading for media

The system SHALL implement lazy loading for media files to improve page load performance.

#### Scenario: Page with many media-rich cards loads
- **WHEN** user loads the inspiration feed with multiple cards containing images/videos
- **THEN** system loads media only for visible cards and defers loading for off-screen content

#### Scenario: User scrolls down the feed
- **WHEN** user scrolls and previously off-screen cards come into view
- **THEN** system loads media for newly visible cards

### Requirement: System indicates media type in card

The system SHALL visually distinguish between text-only, image, and video inspirations.

#### Scenario: Card has images
- **WHEN** inspiration has one or more image attachments
- **THEN** system displays an image icon or badge on the card

#### Scenario: Card has videos
- **WHEN** inspiration has one or more video attachments
- **THEN** system displays a video icon or badge on the card

#### Scenario: Card has mixed media
- **WHEN** inspiration has both image and video attachments
- **THEN** system displays indicators for both media types
