declare module 'expo-image-picker' {
  export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

  export type MediaTypeOptionsValue = 'Images' | 'Videos' | 'All';
  export const MediaTypeOptions: {
    Images: MediaTypeOptionsValue;
    Videos: MediaTypeOptionsValue;
    All: MediaTypeOptionsValue;
  };

  export type ImagePickerAsset = {
    uri: string;
    width?: number;
    height?: number;
    fileName?: string;
    type?: string;
  };

  export type ImagePickerResult = {
    canceled: boolean;
    assets: ImagePickerAsset[];
  };

  export function requestMediaLibraryPermissionsAsync(): Promise<{ status: PermissionStatus }>;
  export function launchImageLibraryAsync(options?: {
    mediaTypes?: MediaTypeOptionsValue;
    quality?: number;
    allowsMultipleSelection?: boolean;
  }): Promise<ImagePickerResult>;
}
