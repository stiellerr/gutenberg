import "./styles.editor.scss";

//import React from "react";
import { __ } from "@wordpress/i18n";
import { registerBlockType, createBlock } from "@wordpress/blocks";
import { RichText, getColorClassName } from "@wordpress/block-editor";
import classnames from "classnames";
import { omit } from "lodash";
//import {  } from "@wordpress/editor";
//import { Toolbar, DropdownMenu, PanelBody, ToggleControl, ColorPicker, ColorPalette } from "@wordpress/components";
//import { alignLeft } from '@wordpress/icons'
//import AlignmentToolbar from "@wordpress/block-editor/src/components/alignment-toolbar";
import Edit from "./edit";

const attributes = {
    content: {
        type: "string",
        source: "html",
        selector: "h4"
    },
    Alignment: {
        type: "string"
    },
    textAlignment: {
        type: "string"
    },
    backgroundColor: {
        type: "string"
    },
    textColor: {
        type: "string"
    },
    customBackgroundColor: {
        type: "string"
    },
    customTextColor: {
        type: "string"
    },
    shadow: {
        type: "boolean",
        default: false
    },
    shadowOpactiy: {
        type: "number",
        default: 0.3
    }
};

registerBlockType("mytheme-blocks/secondblock", {
    title: __("Second Block", "mytheme-blocks"),
    description: __("Our Second Block", "mytheme-blocks"),
    category: "mytheme-cetegory",
    // matrial io svgg
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
    ),
    keywords: [__("Photo", "mytheme-blocks"), __("Tractor", "mytheme-blocks")],

    styles: [
        {
            name: "rounded",
            label: __("Rounded", "mytheme-blocks"),
            isDefault: true
        },
        {
            name: "outline",
            label: __("Outline", "mytheme-blocks")
        },
        {
            name: "squared",
            label: __("Squared", "mytheme-blocks")
        }
    ],

    //if key and variable are the same you can just specify 1
    attributes,
    // this is used when you modify your save block, worpress requires a recompile but this allows you to retain olf vesions and it will read them and work out how to compile your changes on the fly...

    deprecated: [
        {
            attributes: omit(
                {
                    ...attributes,
                    alignment: {
                        type: "string"
                    }
                },
                ["textAlignment"]
            ),

            migrate: attributes => {
                return omit(
                    {
                        ...attributes,
                        textAlignment: attributes.alignment
                    },
                    ["alignment"]
                );
            },

            save: ({ attributes }) => {
                const {
                    content,
                    alignment,
                    backgroundColor,
                    textColor,
                    customBackgroundColor,
                    customTextColor,
                    shadow,
                    shadowOpactiy
                } = attributes;

                const backgroundClass = getColorClassName("background-color", backgroundColor);
                const textClass = getColorClassName("color", textColor);
                /*
                let classes = ''
                if ( backgroundClass ) {
                    classes += backgroundClass;
                }
                if ( testClass ) {
                    classes += testClass;
                }*/
                // or this is an ulternative to the above
                const classes = classnames({
                    //'classname': true
                    [backgroundClass]: backgroundClass,
                    [textClass]: textClass,
                    "has-shadow": shadow,
                    //below ` is used not '
                    [`shadow-opacity-${shadowOpactiy * 100}`]: shadowOpactiy
                });

                return (
                    <RichText.Content
                        tagName="h4"
                        className={classes}
                        value={content}
                        style={{
                            textAlign: alignment,
                            backgroundColor: backgroundClass ? undefined : customBackgroundColor,
                            color: textClass ? undefined : customTextColor
                        }}
                    />
                );
            }
        },
        {
            //supports (if used) @ attritubes keys and values have to be added if you didnt change them.
            attributes: {
                ...attributes,
                content: {
                    type: "string",
                    source: "html",
                    selector: "p"
                }
            },
            save: ({ attributes }) => {
                const {
                    content,
                    alignment,
                    backgroundColor,
                    textColor,
                    customBackgroundColor,
                    customTextColor,
                    shadow,
                    shadowOpactiy
                } = attributes;

                const backgroundClass = getColorClassName("background-color", backgroundColor);
                const textClass = getColorClassName("color", textColor);

                const classes = classnames({
                    //'classname': true
                    [backgroundClass]: backgroundClass,
                    [textClass]: textClass,
                    "has-shadow": shadow,
                    //below ` is used not '
                    [`shadow-opacity-${shadowOpactiy * 100}`]: shadowOpactiy
                });

                return (
                    <RichText.Content
                        tagName="p"
                        className={classes}
                        value={content}
                        style={{
                            textAlign: alignment,
                            backgroundColor: backgroundClass ? undefined : customBackgroundColor,
                            color: textClass ? undefined : customTextColor
                        }}
                    />
                );
            }
        }
    ],
    transforms: {
        from: [
            {
                type: "block",
                blocks: ["core/paragraph"],
                transform: ({ content, align }) => {
                    return createBlock("mytheme-blocks/secondblock", {
                        content: content,
                        textAlignment: align
                    });
                }
            },
            {
                type: "prefix",
                prefix: "#",
                transform: () => {
                    return createBlock("mytheme-blocks/secondblock");
                }
            }
        ],
        to: [
            {
                type: "block",
                blocks: ["core/paragraph"],
                isMatch: ({ content }) => {
                    if (content) return true;
                    return false;
                },
                transform: ({ content, textAlignment }) => {
                    return createBlock("core/paragraph", {
                        content: content,
                        align: textAlignment
                    });
                }
            }
        ]
    },

    edit: Edit,
    save: ({ attributes }) => {
        const {
            content,
            textAlignment,
            backgroundColor,
            textColor,
            customBackgroundColor,
            customTextColor,
            shadow,
            shadowOpactiy
        } = attributes;

        const backgroundClass = getColorClassName("background-color", backgroundColor);
        const textClass = getColorClassName("color", textColor);
        /*
        let classes = ''
        if ( backgroundClass ) {
            classes += backgroundClass;
        }
        if ( testClass ) {
            classes += testClass;
        }*/
        // or this is an ulternative to the above
        const classes = classnames({
            //'classname': true
            [backgroundClass]: backgroundClass,
            [textClass]: textClass,
            "has-shadow": shadow,
            //below ` is used not '
            [`shadow-opacity-${shadowOpactiy * 100}`]: shadowOpactiy
        });

        return (
            <RichText.Content
                tagName="h4"
                className={classes}
                value={content}
                style={{
                    textAlign: textAlignment,
                    backgroundColor: backgroundClass ? undefined : customBackgroundColor,
                    color: textClass ? undefined : customTextColor
                }}
            />
        );
    }
});
