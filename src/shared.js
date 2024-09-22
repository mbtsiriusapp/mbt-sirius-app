import toast from "react-hot-toast";

export const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Copied text to clipboard!!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy text. Please try again!');
    }
};