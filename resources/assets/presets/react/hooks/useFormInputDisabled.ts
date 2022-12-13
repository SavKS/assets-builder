import { useContextualFormStatus } from '@savks/react-forms';

export default function useFormInputDisabled(disabled?: boolean) {
    const { isProcessing, isLocked } = useContextualFormStatus();

    if (disabled === !!disabled) {
        return disabled;
    }

    return isProcessing || isLocked;
}
