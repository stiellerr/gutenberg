import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";

const attributes = {
    columns: {
        type: "number",
        default: 2
    }
};

registerBlockType("mytheme-blocks/team-members", {
    title: __("Team Members", "mytheme-blocks"),
    description: __("Block showing a Team Members", "mytheme-blocks"),
    icon: "grid-view",
    category: "mytheme-cetegory",
    keywords: [
        __("team", "mytheme-blocks"),
        __("member", "mytheme-blocks"),
        __("person", "mytheme-blocks")
    ],
    attributes,
    edit({ className, attributes, setAttributes }) {
        const { columns } = attributes;

        return (
            <div className={`${className} has-${columns}-columns`}>
                <InspectorControls>
                    <PanelBody>
                        <RangeControl
                            label={__("Columns", "mytheme-blocks")}
                            value={columns}
                            onChange={columns => setAttributes({ columns })}
                            min={1}
                            max={6}
                        />
                    </PanelBody>
                </InspectorControls>
                <InnerBlocks
                    allowedBlocks={["mytheme-blocks/team-member"]}
                    template={[
                        ["mytheme-blocks/team-member", { title: "dwd" }],
                        ["mytheme-blocks/team-member"]
                    ]}
                    //templateLock="all"
                    templateLock="insert"
                />
            </div>
        );
    },
    save({ attributes }) {
        const { columns } = attributes;

        return (
            <div className={`has-${columns}-columns`}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
