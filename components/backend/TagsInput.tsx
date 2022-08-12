import React, { useState, KeyboardEvent, useEffect } from 'react';

interface TagsInputProps {
    tags: [];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
    onTagsChange: (newTags: string[]) => void;

}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags, onTagsChange }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(inputValue.trim());
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            const newTags = [...tags, tag];
            setTags(newTags);
            onTagsChange(newTags);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove);
        setTags(newTags);
        onTagsChange(newTags);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center"
                    >
                        {tag?.name ? (
                            <>
                                {tag.name}
                                <button
                                    type="button"
                                    onClick={() => removeTag(tag)}
                                    className="ml-2 text-gray-800 hover:text-red-700"
                                >
                                    &times;
                                </button>
                            </>
                        ) : (
                            <span>Invalid tag</span>
                        )}
                    </span>
                ))}
            </div>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag"
                className="border border-gray-300 rounded-md px-2 py-1"
            />
        </div>
    );
};

export default TagsInput;
