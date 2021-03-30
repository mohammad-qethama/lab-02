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
  const pageOneJson = './data/page-1.json' ;
  const pageTwoJson = './data/page-2.json';
  let hornsObjArray = [];
  let keywords = [];
  function renderPagesOptions( hornsData ){
    $( 'main' ).empty();
    $( '#filter > option ' ).not( ':first' ).remove();
    keywords = [];
    hornsData.forEach( dataVal => {
      let newHorn = new hornObject( dataVal );

      newHorn.renderTemplate();
      console.log( {keywords} );





    } );


  }
  function getData( JsonPath ){

    $.ajax( JsonPath )
      .then( hornsData => {
        hornsObjArray = hornsData;
        console.log( {hornsObjArray} );
        console.log( hornsObjArray );
        hornsData.sort( ( a, b ) => ( a.title > b.title ) ? 1 : -1 );

        renderPagesOptions( hornsData );

      } );}


  function hornObject ( hornsObj ){
    this.title = hornsObj.title;
    this.img = hornsObj.image_url;
    this.description = hornsObj.description;
    this.keyword = hornsObj.keyword;
    this.hornsCount = hornsObj.horns;


  }

  hornObject.prototype.renderTemplate = function(){
    // console.log( 'rendering' );
    // let tempClone = $( '#photo-template' ).first().clone();
    // tempClone.addClass( this.keyword );
    // tempClone.find( 'img' ).attr( 'src',this.img );
    // tempClone.find( 'h2' ).text( this.title );
    // tempClone.find( 'p' ).text( this.description );
    // $( 'main' ).append( tempClone );

    let tempTemplate = $( '#Photo-Mustache' ).html();
    let renderTemplate = Mustache.render( tempTemplate,this );
    $( 'main' ).append( renderTemplate );

    if ( !( keywords.includes( this.keyword ) ) ){
      keywords.push( this.keyword );
      let optionElement = $( '<option> </option>' ).attr( 'value',this.keyword ).text( this.keyword );
      $( '#filter' ).append( optionElement );
    }

  };
  getData( pageOneJson );

  $( '#filter' ).change( ( e ) => {
    $( 'div' ).hide();
    let targetValue = e.target.value;
    $( `.${targetValue}` ).show();
    if( targetValue === 'default' ){
      $( 'div' ).show();
    }

  } );
  $( '#sorter' ).change( ( es ) => {
    if ( es.target.value === 'horns' ){
      console.log( 'hai' );
      hornsObjArray.sort( ( a, b ) => ( a.horns > b.horns ) ? 1 : -1 );
      renderPagesOptions( hornsObjArray );



    }
    if( es.target.value === 'name' ){
      console.log( 'hai2' );
      hornsObjArray.sort( ( a, b ) => ( a.title > b.title ) ? 1 : -1 );
      renderPagesOptions( hornsObjArray );
    }

  } );

  $( '.page' ).click( ( e1 ) =>{
    let pageNumber = e1.target.value;
    if ( pageNumber === 'page1' ){
      getData( pageOneJson );
    }
    if( pageNumber === 'page2' ){
      getData( pageTwoJson );
    }
    $( 'select' ).prop( 'selectedIndex',0 );
  }
  );



} );
