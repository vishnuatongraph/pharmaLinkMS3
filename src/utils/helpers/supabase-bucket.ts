import { supabaseClient } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageToBucket(file: File | null | string) {
  try {
    if (
      file &&
      typeof file != "string" &&
      process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME
    ) {
      const filename = `${uuidv4()}-${file.name}`;

      const { data, error } = await supabaseClient.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
        .upload(filename, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (data) {
        return data.path;
      }
      return error.message;
    }
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      return error.message;
    }

    // Handle other cases if needed
    return "An unknown error occurred";
  }
}

export function getBucketImageUrl(imagePath: string) {
  let bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME;
  let bucketURL = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL;

  let imageUrl = `${bucketURL}/${bucketName}/${imagePath}`;

  return imageUrl;
}
