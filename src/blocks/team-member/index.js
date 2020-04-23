import "./style.editor.scss";
import "./parent";
import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { RichText } from "@wordpress/block-editor";
import edit from "./edit";
import { Dashicon } from "@wordpress/components";

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
    },
    id: {
        type: "number"
    },
    alt: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "alt",
        default: ""
    },
    url: {
        type: "string",
        source: "attribute",
        selector: "img",
        attribute: "src"
    },
    social: {
        type: "array",
        default: [
            { link: "http://facebook.com", icon: "wordpress" },
            { link: "http://facebook.com", icon: "wordpress" }
        ],
        source: "query",
        selector: ".wp-block-mytheme-blocks-team-member__social ul li",
        query: {
            icon: {
                type: "string",
                source: "attribute",
                attribute: "data-icon"
            },

            link: {
                type: "string",
                source: "attribute",
                selector: "a",
                attribute: "href"
            }
        }
    }
};

registerBlockType("mytheme-blocks/team-member", {
    title: __("Team Member", "mytheme-blocks"),
    description: __("Block showing a Team Member", "mytheme-blocks"),
    icon: "admin-users",
    parent: ["mytheme-blocks/team-members"],
    supports: {
        registerBlockType: false,
        html: false
    },
    category: "mytheme-cetegory",
    keywords: [
        __("team", "mytheme-blocks"),
        __("member", "mytheme-blocks"),
        __("person", "mytheme-blocks")
    ],
    attributes,
    edit,
    save: ({ attributes }) => {
        const { title, info, url, alt, id, social } = attributes;

        return (
            <div>
                {url && <img src={url} alt={alt} className={id ? `wp-image-${id}` : null} />}
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
                {social.length > 0 && (
                    <div className={"wp-block-mytheme-blocks-team-member__social"}>
                        <ul>
                            {social.map((item, index) => {
                                return (
                                    <li key={index} data-icon={item.icon}>
                                        <a
                                            href={item.link}
                                            target={"_blank"}
                                            rel={"noopener noreferrer"}
                                        >
                                            <Dashicon icon={item.icon} size={16} />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
});
