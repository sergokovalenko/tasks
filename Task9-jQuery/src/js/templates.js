import $ from 'jquery';
import _ from 'underscore';

const productRowHtml = $('#tableRowTemplate').html();
const tableHtml = $('#tableTemplate').html();
const deleteModalHtml = $('#modalDeleteTemplate').html();
const changeModalHtml = $('#modalChangeTemplate').html();
const tableRowRedrawHtml = $('#tableRowRedrawTemplate').html();
const searchHtml = $('#searchTemplate').html();

export const productRowTemplateFunc = _.template(productRowHtml);
export const tableTemplateFunc = _.template(tableHtml);
export const deleteModalTemplateFunc = _.template(deleteModalHtml);
export const changeModalTemplateFunc = _.template(changeModalHtml);
export const tableRowRedrawTemplate = _.template(tableRowRedrawHtml);
export const searchTemplate = _.template(searchHtml);
export function makeTemplate(html) {
  _.template(html);
}
