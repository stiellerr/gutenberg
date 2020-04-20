import { Component } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    withColors,
    ContrastChecker
} from "@wordpress/block-editor";
import {
    Toolbar,
    DropdownMenu,
    PanelBody,
    ToggleControl,
    //ColorPalette,
    RangeControl
} from "@wordpress/components";
import classnames from "classnames";

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

class Edit extends Component {
    onChangeContent = content => {
        this.props.setAttributes({ content });
    };

    onChangeAlignment = textAlignment => {
        this.props.setAttributes({ textAlignment });
    };

    /*
    onChangeBackgroundColor = backgroundColor => {
        this.props.setAttributes({ backgroundColor });
    };

    onChangeTextColor = textColor => {
        this.props.setAttributes({ textColor });
    };
*/
    toggleShadow = () => {
        this.props.setAttributes({ shadow: !this.props.attributes.shadow });
    };

    onChangeShadowOpacity = shadowOpactiy => {
        this.props.setAttributes({ shadowOpactiy });
    };
    render() {
        const {
            className,
            attributes,
            setTextColor,
            setBackgroundColor,
            backgroundColor,
            textColor
        } = this.props;
        const { content, textAlignment, shadow, shadowOpactiy } = attributes;

        const classes = classnames(className, {
            "has-shadow": shadow,
            //below ` is used not '
            [`shadow-opacity-${shadowOpactiy * 100}`]: shadowOpactiy
        });

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
                        />
                        <ColorPalette
                            colors={[
                                {color: '#f03'},
                                {color: 'blue'},
                            ]}

                            //color="#f03"
                            onChange={ this.onChangeBackgroundColor}
                        />*/}
                    </PanelBody>
                    <PanelBody title={__("Settings", "mytheme-blocks")}>
                        {shadow && (
                            <RangeControl
                                label={__("Shadow Opactiy", "mytheme-blocks")}
                                value={shadowOpactiy}
                                onChange={this.onChangeShadowOpacity}
                                min={0.1}
                                max={0.4}
                                step={0.1}
                            />
                        )}
                    </PanelBody>
                    <PanelColorSettings
                        //this will get the color palete set in your theme!
                        title={__("Panel2", "mytheme-blocks")}
                        colorSettings={[
                            {
                                value: backgroundColor.color,
                                onChange: setBackgroundColor,
                                label: __("Background Color", "mytheme-blocks")
                            },
                            {
                                value: textColor.color,
                                onChange: setTextColor,
                                label: __("Text Color", "mytheme-blocks")
                            }
                        ]}
                    >
                        <ContrastChecker
                            textColor={textColor.color}
                            backgroundColor={backgroundColor.color}
                        />
                    </PanelColorSettings>
                </InspectorControls>

                <BlockControls
                    controls={[
                        {
                            icon: "wordpress",
                            title: __("test", "mytheme-blocks"),
                            onClick: () => this.onChangeAlignment("right"),
                            isActive: true
                        },
                        {
                            icon: "wordpress",
                            title: __("test", "mytheme-blocks"),
                            onClick: () => alert(true),
                            isActive: false
                        },
                        {
                            icon: "wordpress",
                            title: __("Shadow", "mytheme-blocks"),
                            onClick: this.toggleShadow,
                            isActive: shadow
                        }
                    ]}
                >
                    <AlignmentToolbar
                        value={textAlignment}
                        onChange={this.onChangeAlignment}
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
                    tagName="h4"
                    className={classes}
                    onChange={this.onChangeContent}
                    value={content}
                    allowedFormats={["core/bold"]}
                    style={{
                        textAlign: textAlignment,
                        backgroundColor: backgroundColor.color,
                        color: textColor.color
                    }}
                />
            </>
        );
    }
}

export default withColors("backgroundColor", { textColor: "color" })(Edit);
