<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">

        <form action="index.php" method="post" enctype="multipart/form-data" id="form">

            <label for="lttbxdID"></label>
            <input type="text" name="lttbxdID" id="lttbxdID" placeholder="Your Lettexboxd username.." />
            <div class="upload" onclick="document.getElementById('file-input').click()">
                <input type="file" accept=".csv" name="csv_file" id="file-input" style="display: none;" />
                <img src="upload_icon.svg" height="25" width="25" />
                Upload
            </div>
            <input type="submit" value="upload" name="submit">
        </form>

    </div>

    <?php
    $dates = array();
    $lttbxdID;

    if (isset($_FILES['csv_file'])) {

        $file_tmp = $_FILES['csv_file']['tmp_name'];

        if (($handle = fopen($file_tmp, "r")) !== FALSE) {
            // Loop through each row of data
            while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                // echo $data[2] . "<br>";
                array_push($dates, (int) $data[2]);
            }

            fclose($handle);
        }

        var_dump($dates);
        $lttbxdID = $_POST['lttbxdID'];

        $redirect_url = "diagDates/iagDates.php?dates=" . urlencode(json_encode($dates)) . "&lttbxdID=" . urldecode($lttbxdID);

        header("Location: $redirect_url");
        exit();
    }
    ?>
</body>

</html>