import $ from 'jquery';
import _ from 'underscore';

const productRowHtml = $('#tableRowTemplate').html();
const tableHtml = $('#tableTemplate').html();
const deleteModalHtml = $('#modalDeleteTemplate').html();
const changeModalHtml = $('#modalChangeTemplate').html();
const tableRowRedrawHtml = $('#tableRowRedrawTemplate').html();

export const productRowTemplateFunc = _.template(productRowHtml);
export const tableTemplateFunc = _.template(tableHtml);
export const deleteModalTemplateFunc = _.template(deleteModalHtml);
export const changeModalTemplateFunc = _.template(changeModalHtml);
export const tableRowRedrawTemplate = _.template(tableRowRedrawHtml);
