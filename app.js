<!DOCTYPE html>
<html>
  <head>
    <title>Run JMeter</title>
  </head>
  <body>
    <button onclick="runJMeter()">Run JMeter</button>
    <div id="result"></div>
    <script>
      function runJMeter() {
        fetch('/run-jmeter')
          .then(response => response.text())
          .then(html => document.getElementById('result').innerHTML = html);
      }
    </script>
  </body>
</html>
