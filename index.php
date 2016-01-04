<?PHP

// URL Being requested:
// http://api.bart.gov/api/etd.aspx?cmd=etd&orig=deln&key=MW9S-E7SL-26DU-VV8V&dir=s

// For JSON Output:
// $data = "{ 'key': 'value' }";
// header('Content-Type: application/json');
// echo json_encode($data);


function download_page($path){
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$path);
    curl_setopt($ch, CURLOPT_FAILONERROR,1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION,1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    curl_setopt($ch, CURLOPT_TIMEOUT, 500);
    $retValue = curl_exec($ch);
    curl_close($ch);
    return $retValue;
}

$bartData = download_page('http://api.bart.gov/api/etd.aspx?cmd=etd&orig=deln&key=MW9S-E7SL-26DU-VV8V&dir=s');
$bartData = simplexml_load_string($bartData);
$bartData = json_encode((array) $bartData);
$bartData = json_decode($bartData, true);

$simpleBartData = array();

$stationLines = $bartData["station"]["etd"];



// Check for only one line:
if (!isset($stationLines[0])) {
    $stationLines = array($stationLines);
}

foreach ($stationLines as $currentLine) {

    $lineEstimates = $currentLine["estimate"];

    // Check for only one estimate:
    if (!isset($lineEstimates[0])) {
        $lineEstimates = array($lineEstimates);
    }

    foreach ($lineEstimates as $currentEstimate) {
        if ($currentEstimate["minutes"] == "Arrived" || $currentEstimate["minutes"] == "Leaving") {
            continue;
        }
        array_push($simpleBartData, array($currentEstimate["hexcolor"], $currentEstimate["minutes"]));
    }
}

// Sort the resulting array:
$sortFunc = function ($a, $b) {
    return $a[1] >= $b[1];
};
uasort($simpleBartData, $sortFunc);

// Output the results:
for($i = 0; $i < 3 && $i < count($simpleBartData); $i++) {
    echo $simpleBartData[$i][0];
    echo ":";
    echo $simpleBartData[$i][1];
    echo ",";
}
echo "END";