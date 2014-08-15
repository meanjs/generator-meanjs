[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)


## Overview

This download the bootstrap 3.2.0 SCSS files.

You just need to have gem installed. And then run : 

    gem install compass

Grunt is updated with the compass-watch. 

All the SCSS files are located :  

    sass/bootstrap/stylesheets
    
Compass is a processor that watches changes into .scss files. Which is an improved CSSlanguage that supports variasbles definitions.

.forms{
    input:active {
        //make the input color lighter when not focused
        color : lighten($inputColo, 20%r);
    }
}

    sass/boostrap/stylesheets/bootsrap/_variables.scss
    
This file contains aeround 300 variable definitions for all the bootstrap framework.

for example, button styles are defined here : 


    $btn-font-weight:                normal !default;

    $btn-default-color:              #333 !default;
    $btn-default-bg:                 #fff !default;
    $btn-default-border:             #ccc !default;
    $btn-primary-color:              #fff !default;
    $btn-primary-bg:                 $brand-primary !default;
    $btn-primary-border:             darken($btn-primary-bg, 5%) !default;
    
Any changes to one of this file generate the .css file : 

    /public/lib/bootstrap/dist/sasstocss/bootstrap.css
    
And triggers the grunt cssmin task that minify bootstrap and concatenate it normally.








All bootstrap production files are moved to /public/lib/bootstrap/dist/sasstocss

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)

