export class ImageConstants {

  //public static baseUrl = '/netcore-analytics-php/analytics';
  public static point = '/common/images/point.png';

  public static bar = '/common/images/bar.png';
  public static box_images =  '/common/images/box-images.jpg';
  public static plain_box_images =  '/common/images/plain_bar.png';
  public static axis =  '/common/images/axis.jpg';
  public static plus =  '/common/images/plus.png';
  public static plus_hover = '/common/images/plus-hover.png';

  public static archive_pop =  '/common/images/archive-pop.png';
  public static archive =  '/common/images/archive.png';

  public static fct =  '/common/images/fct.png';
  public static funnal_order = '/common/images/funnel-order.png'

  public static bullet_delete =  '/common/images/bullet_delete.png';
  public static bullet_add =  '/common/images/bullet_add.png';
  public static logo =  '/common/images/logo.png';


  public static GetImageUrl = (baseUrl: string, image: string) => {
    return baseUrl + ImageConstants[image];
  }
}