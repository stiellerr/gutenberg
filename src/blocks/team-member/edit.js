import { Component } from "@wordpress/element";
import {
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls,
    URLInput
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import {
    Spinner,
    withNotices,
    Toolbar,
    ToolbarButton,
    IconButton,
    PanelBody,
    TextareaControl,
    SelectControl,
    Dashicon,
    Tooltip,
    TextControl
} from "@wordpress/components";
import { withSelect } from "@wordpress/data";

class TeamMemberEdit extends Component {
    state = {
        selectedLink: null
    };

    componentDidUpdate(prevProps) {
        if (prevProps.isSelected && !this.props.isSelected) {
            this.setState({
                selectedLink: null
            });
        }
    }

    componentDidMount() {
        const { attributes, setAttributes } = this.props;
        const { url, id } = attributes;
        if (url && isBlobURL(url) && !id) {
            setAttributes({
                url: "",
                alt: ""
            });
        }
    }

    onChangeTitle = title => {
        //this.props.setAttributes({title})
        this.props.setAttributes({ title });
    };

    onChangeInfo = info => {
        this.props.setAttributes({ info });
    };

    onSelectImage = ({ id, url, alt }) => {
        this.props.setAttributes({
            id,
            url,
            alt
        });
    };

    onSelectURL = url => {
        this.props.setAttributes({
            url,
            id: null,
            alt: ""
        });
    };

    onUploadError = message => {
        const { noticeOperations } = this.props;
        noticeOperations.createErrorNotice(message);
    };

    removeImage = () => {
        this.props.setAttributes({
            url: "",
            id: null,
            alt: ""
        });
    };

    updateAlt = alt => {
        this.props.setAttributes({ alt });
    };

    onImageSizeChange = url => {
        this.props.setAttributes({ url });
    };

    getImageSizes() {
        const { image, imageSizes } = this.props;
        if (!image) return [];
        let options = [];
        const sizes = image.media_details.sizes;
        for (const key in sizes) {
            const size = sizes[key];
            const imageSize = imageSizes.find(size => size.slug === key);
            if (imageSize) {
                options.push({
                    label: imageSize.name,
                    value: size.source_url
                });
            }
        }
        return options;
    }

    addNewLink = () => {
        const { setAttributes, attributes } = this.props;
        const { social } = attributes;
        setAttributes({
            social: [...social, { icon: "wordpress", link: "" }]
        });
        this.setState({
            selectedLink: social.length
        });
    };

    updateSocialItem = (type, value) => {
        const { attributes, setAttributes } = this.props;
        const { social } = attributes;
        const { selectedLink } = this.state;

        let new_social = [...social];
        new_social[selectedLink][type] = value;

        setAttributes({ social: new_social });
    };

    removeLink = e => {
        e.preventDefault();
        const { attributes, setAttributes } = this.props;
        const { social } = attributes;
        const { selectedLink } = this.state;

        setAttributes({
            social: [...social.slice(0, selectedLink), ...social.slice(selectedLink + 1)]
        });
        this.setState({
            selectedLink: null
        });
    };

    render() {
        console.log(this.props);
        const { className, attributes, noticeUI, isSelected } = this.props;
        const { title, info, id, url, alt, social } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__("Image Settings", "mytheme-blocks")}>
                        {url && !isBlobURL(url) && (
                            <TextareaControl
                                label={__("Alt Text (Alternative Text", "mytheme-blocks")}
                                value={alt}
                                onChange={this.updateAlt}
                                help={__(
                                    "Alternative text describes your image to people who can't see it. Add a short description with its key details",
                                    "mytheme-blocks"
                                )}
                            />
                        )}
                        {id && (
                            <SelectControl
                                label={__("Image Size", "mytheme-blocks")}
                                options={this.getImageSizes()}
                                onChange={this.onImageSizeChange}
                                value={url}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    {url && (
                        <Toolbar>
                            {id && (
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={this.onSelectImage}
                                        allowedTypes={["image"]}
                                        value={id}
                                        render={({ open }) => {
                                            return (
                                                <IconButton
                                                    //className="components-icon-button components-toolbar__control"
                                                    label={__("Edit Image", "mytheme-blocks")}
                                                    onClick={open}
                                                    icon="edit"
                                                />
                                            );
                                        }}
                                    />
                                </MediaUploadCheck>
                            )}
                            <ToolbarButton
                                //className="components-icon-button components-toolbar__control"
                                label={__("Remove Image", "mytheme-blocks")}
                                onClick={this.removeImage}
                                icon="trash"
                            />
                        </Toolbar>
                    )}
                </BlockControls>
                <div className={className}>
                    {url ? (
                        <>
                            <img src={url} alt={alt} />
                            {isBlobURL(url) && <Spinner />}
                        </>
                    ) : (
                        <MediaPlaceholder
                            icon="format-image"
                            onSelect={this.onSelectImage}
                            onSelectURL={this.onSelectURL}
                            onError={this.onUploadError}
                            labels={{ title: "Image" }}
                            //accept="image/*"
                            allowedTypes={["image"]}
                            notices={noticeUI}
                        />
                    )}
                    <RichText
                        className={"wp-block-mytheme-blocks-team-member__title"}
                        tagName="h4"
                        onChange={this.onChangeTitle}
                        value={title}
                        placeholder={__("Member Name", "mytheme-blocks")}
                        allowedFormats={[]}
                    />
                    <RichText
                        className={"wp-block-mytheme-blocks-team-member__info"}
                        tagName="p"
                        onChange={this.onChangeInfo}
                        value={info}
                        placeholder={__("Member Info", "mytheme-blocks")}
                        allowedFormats={[]}
                    />
                    <div className={"wp-block-mytheme-blocks-team-member__social"}>
                        <ul>
                            {social.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() => this.setState({ selectedLink: index })}
                                        className={
                                            this.state.selectedLink === index ? "is-selected" : null
                                        }
                                    >
                                        <Dashicon icon={item.icon} size={16} />
                                    </li>
                                );
                            })}
                            {isSelected && (
                                <li className={"wp-block-mytheme-blocks-team-member__addIconLI"}>
                                    <Tooltip test={__("Add Item", "mytheme-blocks")}>
                                        <button
                                            className={
                                                "wp-block-mytheme-blocks-team-member__addIcon"
                                            }
                                            onClick={this.addNewLink}
                                        >
                                            <Dashicon icon={"plus"} size={16} />
                                        </button>
                                    </Tooltip>
                                </li>
                            )}
                        </ul>
                    </div>
                    {this.state.selectedLink !== null && (
                        <div className={"wp-block-mytheme-blocks-team-member__linkForm"}>
                            <TextControl
                                label={__("Icon", "mytheme_blocks")}
                                value={social[this.state.selectedLink].icon}
                                onChange={icon => this.updateSocialItem("icon", icon)}
                            />
                            <URLInput
                                //label={__('URL', 'mytheme_blocks')}
                                value={social[this.state.selectedLink].link}
                                onChange={url => this.updateSocialItem("link", url)}
                            />
                            <a
                                className="wp-block-mytheme-blocks-team-member__removeLink"
                                onClick={this.removeLink}
                            >
                                {__("Remove Link")}
                            </a>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default withSelect((select, props) => {
    const id = props.attributes.id;
    return {
        image: id ? select("core").getMedia(id) : null,
        imageSizes: select("core/editor").getEditorSettings().imageSizes
    };
})(withNotices(TeamMemberEdit));
