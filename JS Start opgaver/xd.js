function renderPage(title,heading,demoString) {
    x = `!DOCTYPE html>
    <html lang="da">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
      </head>
      <body>
        <!-- page content -->
        <h1> ${heading} </h1>
        <script>
          console.log("${demoString}");
        </script>
      </body>
    </html>`
    return x;
 } 
 console.log(renderPage("My Page","Hello World","Hello World"));


