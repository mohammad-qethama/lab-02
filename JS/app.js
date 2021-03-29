`use strict`;
$( document ).ready( function(){
// let widthScreen;
// widthScreen = $(window).width();
// if ( 767 > widthScreen && widthScreen >= 480 ){
//     $('div').css({'background-color':'#f39189'});
// }else if( 960 >= widthScreen && widthScreen >= 767){
//     $('div').css({'background-color':'#6e7582'});
// }else{
//     $('div').css({'background-color':'#fff'});
// }
// $(window).resize(() => {
//     widthScreen = $(window).width();
//     if ( 767 > widthScreen && widthScreen >= 480 ){
//         $('div').css({'background-color':'#f39189'});
//     }else if( 960 >= widthScreen && widthScreen >= 767){
//         $('div').css({'background-color':'#6e7582'});
//     }else{
//         $('div').css({'background-color':'#fff'});
//     }
//      });
  let hornsData = [];
  let keywords = [];
  $.ajax( './data/page-1.json' )
    .then( hornsData => {

      hornsData.forEach( dataVal => {
        let newHorn = new hornObject( dataVal );

        newHorn.renderTemplate();





      } );
      $( '#photo-template' ).first().remove();
    } );


  function hornObject ( hornsObj ){
    this.title = hornsObj.title;
    this.img = hornsObj.image_url;
    this.description = hornsObj.description;
    this.keyword = hornsObj.keyword;
    this.hornsCount = hornsObj.horns;


  }

  hornObject.prototype.renderTemplate = function(){
    console.log( 'rendering' );
    let tempClone = $( '#photo-template' ).first().clone();
    tempClone.addClass( this.keyword );
    tempClone.find( 'img' ).attr( 'src',this.img );
    tempClone.find( 'h2' ).text( this.title );
    tempClone.find( 'p' ).text( this.description );
    $( 'main' ).append( tempClone );

    if ( !( keywords.includes( this.keyword ) ) ){
      keywords.push( this.keyword );
      let optionElement = $( '<option> </option>' ).attr( 'value',this.keyword ).text( this.keyword );
      $( 'select' ).append( optionElement );
    }

  };

  $( 'select' ).change( ( e ) => {
    $( 'div' ).hide();
    let targetValue = e.target.value;
    $( `.${targetValue}` ).show();
    if( targetValue === 'default' ){
      $( 'div' ).show();
    }


  } );



} );
