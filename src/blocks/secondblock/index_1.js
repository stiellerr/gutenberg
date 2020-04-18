import "./styles.editor.scss";

//import React from "react";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    PanelColorSettings
} from "@wordpress/block-editor";
//import {  } from "@wordpress/editor";
import {
    Toolbar,
    DropdownMenu,
    PanelBody,
    ToggleControl,
    ColorPicker,
    ColorPalette
} from "@wordpress/components";
//import { alignLeft } from '@wordpress/icons'
//import AlignmentToolbar from "@wordpress/block-editor/src/components/alignment-toolbar";
import Edit from "./edit";

const DEFAULT_ALIGNMENT_CONTROLS = [
    {
        icon: "editor-alignleft",
        title: __("Align text left"),
        align: "left"
    },
    {
        icon: "editor-aligncenter",
        title: __("Align text center"),
        align: "center"
    },
    {
        icon: "editor-alignright",
        title: __("Align text right"),
        align: "right"
    },
    {
        icon: "editor-justify",
        title: __("Align text justify"),
        align: "justify"
    }
];

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

    attributes: {
        content: {
            type: "string",
            source: "html",
            selector: "p"
        },
        alignment: {
            type: "string"
        },
        backgroundColor: {
            type: "string"
        },
        textColor: {
            type: "string"
        }
    },
    edit: Edit,
    edit2: ({ className, attributes, setAttributes }) => {
        console.log(attributes);
        const { content, alignment, backgroundColor, textColor } = attributes;

        const onChangeContent = content => {
            setAttributes({ content });
        };

        const onChangeAlignment = alignment => {
            setAttributes({ alignment });
        };

        const onChangeBackgroundColor = backgroundColor => {
            setAttributes({ backgroundColor });
        };

        const onChangeTextColor = textColor => {
            setAttributes({ textColor });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Panel", "mytheme-blocks")}>
                        <ToggleControl
                            label={__("Panel", "mytheme-blocks")}
                            onChange={s => console.log(s)}
                        />
                        {/*
                        <ColorPicker
                            color="#f03"
                            onChangeComplete={ (s) => console.log(s)}
                        />*/}
                        <ColorPalette
                            colors={[{ color: "#f03" }, { color: "blue" }]}
                            //color="#f03"
                            onChange={onChangeBackgroundColor}
                        />
                    </PanelBody>
                    <PanelColorSettings
                        //this will get the color palete set in your theme!
                        title={__("Panel2", "mytheme-blocks")}
                        colorSettings={[
                            {
                                value: backgroundColor,
                                onChange: onChangeBackgroundColor,
                                label: __("Background Color", "mytheme-blocks")
                            },
                            {
                                value: textColor,
                                onChange: onChangeTextColor,
                                label: __("Text Color", "mytheme-blocks")
                            }
                        ]}
                    />
                </InspectorControls>

                <BlockControls
                    controls={[
                        {
                            icon: "wordpress",
                            title: __("test", "mytheme-blocks"),
                            onClick: () => onChangeAlignment("right"),
                            isActive: true
                        },
                        {
                            icon: "wordpress",
                            title: __("test", "mytheme-blocks"),
                            onClick: () => alert(true),
                            isActive: false
                        }
                    ]}
                >
                    <AlignmentToolbar
                        value={alignment}
                        onChange={onChangeAlignment}
                        alignmentControls={DEFAULT_ALIGNMENT_CONTROLS}
                    />

                    <Toolbar
                        isCollapsed
                        controls={[
                            {
                                icon: "wordpress",
                                title: __("test", "mytheme-blocks"),
                                onClick: () => alert(true),
                                isActive: true
                            },
                            {
                                icon: "wordpress",
                                title: __("test", "mytheme-blocks"),
                                onClick: () => alert(true),
                                isActive: false
                            }
                        ]}
                    />

                    <Toolbar
                        //isCollapsed
                        controls={[
                            {
                                icon: "wordpress",
                                title: __("test", "mytheme-blocks"),
                                onClick: () => alert(true),
                                isActive: true
                            },
                            {
                                icon: "wordpress",
                                title: __("test", "mytheme-blocks"),
                                onClick: () => alert(true),
                                isActive: false
                            }
                        ]}
                    />
                    {content && content.length > 0 && (
                        <Toolbar>
                            <DropdownMenu
                                icon="editor-table"
                                label={__("test", "mytheme-blocks")}
                                controls={[
                                    {
                                        icon: "wordpress",
                                        title: __("test", "mytheme-blocks"),
                                        onClick: () => alert(true),
                                        isActive: true
                                    },
                                    {
                                        icon: "wordpress",
                                        title: __("test", "mytheme-blocks"),
                                        onClick: () => alert(true),
                                        isActive: false
                                    }
                                ]}
                            />
                        </Toolbar>
                    )}
                </BlockControls>
                <RichText
                    tagName="p"
                    className={className}
                    onChange={onChangeContent}
                    value={content}
                    allowedFormats={["core/bold"]}
                    style={{
                        textAlign: alignment,
                        backgroundColor: backgroundColor,
                        color: textColor
                    }}
                />
            </>
        );
    },
    save: ({ attributes }) => {
        const { content, alignment, backgroundColor, textColor } = attributes;
        console.log(attributes);
        return (
            <RichText.Content
                tagName="p"
                value={content}
                style={{ textAlign: alignment, backgroundColor: backgroundColor, color: textColor }}
            />
        );
    }
});
