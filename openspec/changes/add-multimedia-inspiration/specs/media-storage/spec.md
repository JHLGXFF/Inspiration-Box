## ADDED Requirements

### Requirement: System stores uploaded media files securely

The system SHALL save uploaded media files to a dedicated storage location with organized folder structure.

#### Scenario: Image file is uploaded
- **WHEN** server receives a valid image file upload
- **THEN** system saves the file to the `media/images/` directory with a unique filename

#### Scenario: Video file is uploaded
- **WHEN** server receives a valid video file upload
- **THEN** system saves the file to the `media/videos/` directory with a unique filename

### Requirement: System generates unique filenames to prevent collisions

The system SHALL generate unique filenames for uploaded media files to prevent naming conflicts.

#### Scenario: File with same name is uploaded
- **WHEN** two files with identical original names are uploaded
- **THEN** system generates unique filenames (e.g., using UUID or timestamp) so both files are stored without overwriting

#### Scenario: Generated filename preserves extension
- **WHEN** system generates a unique filename for an uploaded file
- **THEN** system maintains the original file extension (e.g., .jpg, .mp4)

### Requirement: System stores media metadata in database

The system SHALL record metadata for each uploaded media file in the database alongside the memo.

#### Scenario: Media file is saved successfully
- **WHEN** media file is stored on disk
- **THEN** system creates a database record with file path, file type, file size, original filename, and upload timestamp

#### Scenario: Multiple media files attached to one memo
- **WHEN** multiple media files are uploaded for a single inspiration
- **THEN** system creates separate database records for each file, all linked to the same memo ID

### Requirement: System validates file integrity after storage

The system SHALL verify that uploaded files are stored correctly and are not corrupted.

#### Scenario: File is saved and verified
- **WHEN** file is written to storage
- **THEN** system checks file exists and size matches the uploaded content

#### Scenario: File storage fails
- **WHEN** file write operation fails or verification detects mismatch
- **THEN** system returns an error to the client and does not create database record

### Requirement: System serves media files via secure URLs

The system SHALL provide access to stored media files through API endpoints that serve the files.

#### Scenario: Client requests media file
- **WHEN** client requests a media file using its unique ID or path
- **THEN** system returns the file with appropriate Content-Type header

#### Scenario: Client requests non-existent media file
- **WHEN** client requests a media file that does not exist
- **THEN** system returns a 404 Not Found error

### Requirement: System enforces storage quotas

The system SHALL track total storage usage and enforce limits to prevent excessive disk consumption.

#### Scenario: Storage is within quota
- **WHEN** user uploads a media file and total usage is below quota
- **THEN** system accepts the file and updates usage tracking

#### Scenario: Upload would exceed storage quota
- **WHEN** user attempts to upload a file that would push total storage over the limit
- **THEN** system rejects the upload and returns an error message indicating storage limit reached

### Requirement: System supports media file deletion

The system SHALL allow deletion of media files when associated memos are deleted or when user removes attachments.

#### Scenario: Memo with media is deleted
- **WHEN** user deletes a memo that has media attachments
- **THEN** system removes all associated media files from storage and deletes their database records

#### Scenario: User removes individual media attachment
- **WHEN** user removes a specific media file from a memo while editing
- **THEN** system deletes the file from storage and removes its database record, but keeps other attachments intact

#### Scenario: Orphaned files are cleaned up
- **WHEN** system detects media files in storage without corresponding database records
- **THEN** system removes these orphaned files during cleanup process
