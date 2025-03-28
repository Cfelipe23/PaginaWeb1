document.addEventListener( "DOMContentLoaded", function () {
  const canvas = document.getElementById( "lienzo" );

  if ( canvas.getContext ) {
    const ctx = canvas.getContext( "2d" );

    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect( 0, 0, canvas.width, canvas.height );

    ctx.fillStyle = "#FFDAB9";
    ctx.beginPath();
    ctx.arc( 250, 80, 40, 0, Math.PI * 2 );
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc( 250, 60, 40, 0, Math.PI, true );
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "blue";
    ctx.fillRect( 200, 120, 100, 80 );


    ctx.fillStyle = "rgb(192, 128, 128)";
    ctx.fillRect( 210, 190, 80, 40 );
    ctx.strokeStyle = "black";
    ctx.strokeRect( 210, 190, 80, 40 );

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc( 235, 75, 5, 0, Math.PI * 2 );
    ctx.arc( 265, 75, 5, 0, Math.PI * 2 );
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc( 250, 90, 10, 0, Math.PI, false );
    ctx.stroke();
    ctx.closePath();
  }
} );
