var registerBlockType = wp.blocks.registerBlockType;
var __ = wp.i18n.__;
var el = wp.element.createElement;

registerBlockType("mytheme-blocks/firstblock", {
    title: __("First gggg Block", "mytheme-blocks"),
    description: __("Our First Block", "mytheme-blocks"),
    category: "layout",
    icon: {
        foreground: "#f03",
        src: "admin-network"
    },
    keywords: [__("Photo", "mytheme-blocks"), __("Tractor", "mytheme-blocks")],
    edit: function () {
        return el("p", null, "Editor");
    },
    save: function () {
        return el("p", null, "Saved Content");
    }
});
