import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { interceptFunction } from '~/Utils';
import { BaseFeature } from '../BaseFeature';
import { BlipsSidebar } from './BlipsSidebar';
import { getFlowBlockById, getAllFlowBlock, getBlockById } from '~/Utils';
import { colorBlockBackground, formatShapeBlock } from '~/BlipBlocksFunctions';
import { EditBlockOption } from './EditBlockOption';

import { ChangeBlockFormat } from './ChangeBlockFormat';
import { ChangeBlockColor } from './ChangeBlockColor';

const BLIPS_SIDEBAR_ID = 'blips-extension-sidebar-block-edit';
const BUILDER_MAIN_AEREA_ID = 'main-content-area';
const BUILDER_HTML_MENU_BLOCK_CLASS = 'builder-node-menu';
const BUILDER_HTML_MENU_BLOCK_LIST_CLASS = 'builder-node-context-menu';
const DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT = 'ph3 pv1 bp-fs-7 tc';
const BUILDER_HTML_BLOCK_TAG = 'builder-node';

export class EditBlock extends BaseFeature {
  public static shouldRunOnce = true;
  private id = "";
  private ChangeBlockFormatrFeature: BaseFeature;
  private ChangeBlockColorFeature: BaseFeature;

  private getSidebar(): HTMLElement {
    return document.getElementById(BLIPS_SIDEBAR_ID);
  }

  private openSidebar = (): void => {
    console.log("Abrindo sidebar com o id " + this.id)
    if (!this.getSidebar()) {
      // Creates and append the sidebar to the dom
      const blipsSidebar = document.createElement('div');

      blipsSidebar.setAttribute('id', BLIPS_SIDEBAR_ID);
      ReactDOM.render(
        <BlipsSidebar id={this.id} onEditBackgorundColor={this.onEditBackgorundColor} onEditTextColor={this.onEditTextColor} onEditShape={this.onEditShape} onClose={this.closeSidebar} />,
        blipsSidebar
      );

      const mainArea = document.getElementById(BUILDER_MAIN_AEREA_ID);
      mainArea.appendChild(blipsSidebar);

      // Waits for a moment and then fades the sidebar in
      const customSidebar = this.getSidebar().children.item(0);
      interceptFunction('closeSidebar', this.closeSidebar);

      setTimeout(() => {
        customSidebar.classList.add('ng-enter-active');
      }, 200);
    } else {
      return this.closeSidebar();
    }
  };

  private closeSidebar = (): void => {
    const sidebar = this.getSidebar();

    if (sidebar) {
      sidebar.remove();
    }
  };

  private onEditBackgorundColor = (id: string, color: string): void => {
    console.log("Editando o bloco " + id + " Com a cor " + color)
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);

    block.addonsSettings = { ...block.addonsSettings, color: color };

    colorBlockBackground(color, flowBlock);
  };

  private onEditTextColor = (id: string): void => {
    return;
  };

  private onEditShape = (id: string, shape: string): void => {
    console.log("Editando o bloco " + id + " Com o formato " + shape)
    const block = getBlockById(id);
    const flowBlock = getFlowBlockById(id);
    block.addonsSettings = { ...block.addonsSettings, shape };

    formatShapeBlock(shape, flowBlock);
  };

  private createBlockOptionsDiv(): any {
    const blipsDiv = document.createElement('div');
    blipsDiv.setAttribute(
      'class',
      DEFALT_CLASS_BUILDER_HTML_MENU_BLOCK_LIST_ELEMENT
    );
    return blipsDiv;
  }

  public menuOptionElementHandle = (id: string): void => {
    this.id = id;
    this.openSidebar();
  }

  private addChangeFormatOptionOnBlockById(id: string): void {
    const menuOptionsList = document.querySelector(
      `${BUILDER_HTML_BLOCK_TAG}[id="${id}"] .${BUILDER_HTML_MENU_BLOCK_CLASS} .${BUILDER_HTML_MENU_BLOCK_LIST_CLASS}`
    );

    if (menuOptionsList) {
      const menuOptionElement = this.createBlockOptionsDiv();

      ReactDOM.render(
        <EditBlockOption id={id} onClick={this.menuOptionElementHandle}/>,
        menuOptionElement
      );
      menuOptionsList.appendChild(menuOptionElement);
    }
  }

  private addEditOptionInAllBlocks = (): void => {
    const blocks = getAllFlowBlock();

    for (const block of blocks) {
      this.addChangeFormatOptionOnBlockById(block.id);
    }
  };


  public handle(): boolean {
    this.addEditOptionInAllBlocks();
    this.ChangeBlockFormatrFeature = new ChangeBlockFormat()
    this.ChangeBlockColorFeature = new ChangeBlockColor()
    this.ChangeBlockFormatrFeature.handle();
    this.ChangeBlockColorFeature.handle();

    return true;
  }

  /**
   * Removes the functionality to copy the block
   */
  public cleanup(): void {
    this.closeSidebar();
  }
}