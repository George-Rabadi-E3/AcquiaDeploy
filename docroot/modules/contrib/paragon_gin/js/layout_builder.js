'use strict';

(($, Drupal, drupalSettings) => {

  Drupal.toolbar.ToolbarVisualView.prototype.updateToolbarHeight = function () {
    const glbToolbar = $('.glb-toolbar');
    // const toolbarTabOuterHeight = $('#toolbar-bar').outerHeight() || 0;
    // const toolbarTrayHorizontalOuterHeight = $('.is-active.toolbar-tray-horizontal').outerHeight() || 0;
    // const toolbarHorizontalAdminOuterHeight = $('.gin--horizontal-toolbar #toolbar-administration').outerHeight() || 0;
    // const glbToolbarHeight = glbToolbar.outerHeight();
    //
    // this.model.set(
    //   'height',
    //   toolbarTabOuterHeight +
    //   toolbarTrayHorizontalOuterHeight +
    //   glbToolbarHeight +
    //   toolbarHorizontalAdminOuterHeight
    // );
    //
    // const body = $('body')[0];
    // body.style.setProperty('padding-top', this.model.get('height') + 'px', 'important');
    // glbToolbar.css('top', toolbarTabOuterHeight + toolbarTrayHorizontalOuterHeight + toolbarHorizontalAdminOuterHeight);
    glbToolbar.addClass('glb-toolbar--processed');
    alert('hey');
    // this.triggerDisplace();
  }
})(jQuery, Drupal, drupalSettings);

