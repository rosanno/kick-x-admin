import axios from "axios";
import toast from "react-hot-toast";

const useRemoveImage = () => {
  const onRemove = async (url: string, field: any) => {
    try {
      const newUrl = url.substring(
        url.lastIndexOf("/") + 1
      );
      await axios.delete("/api/uploadthing", {
        data: {
          url: newUrl,
        },
      });
      field.onChange([
        ...field.value.filter(
          (current: any) => current.image_path !== url
        ),
      ]);
      toast.success("Image deleted.");
    } catch (error) {
      toast.error("Failed to delete image.");
    }
  };

  return { onRemove };
};

export default useRemoveImage;
