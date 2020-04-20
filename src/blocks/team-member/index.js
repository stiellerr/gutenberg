import "./style.editor.scss";
import "./parent";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";
import edit from "./edit";

const attributes = {
    title: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    info: {
        type: "string",
        source: "html",
        selector: "p"
    }
};

registerBlockType("mytheme-blocks/team-member", {
    title: __("Team Member", "mytheme-blocks"),
    description: __("Block showing a Team Member", "mytheme-blocks"),
    icon: "admin-users",
    parent: ["mytheme-blocks/team-members"],
    category: "mytheme-cetegory",
    keywords: [
        __("team", "mytheme-blocks"),
        __("member", "mytheme-blocks"),
        __("person", "mytheme-blocks")
    ],
    attributes,
    edit,
    save: ({ attributes }) => {
        const { title, info } = attributes;

        return (
            <div>
                {title && (
                    <RichText.Content
                        className={"wp-block-mytheme-blocks-team-member__title"}
                        tagName="h4"
                        value={title}
                    />
                )}
                {info && (
                    <RichText.Content
                        className={"wp-block-mytheme-blocks-team-member__info"}
                        tagName="p"
                        value={info}
                    />
                )}
            </div>
        );
    }
});
