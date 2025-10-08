<?php
// Sanitize and validate inputs
$name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
$visitor_email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
$message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);

$email_from = 'info@smartechtutorialspro.com';

$email_subject = 'New Form Submission';

$email_body = "User Name: $name\n".
              "User Email: $visitor_email\n".
              "Subject: $subject\n".
              "User Message: $message\n";

$to = 'abdulrahmanmbello209@gmail.com';

$headers = "From: $email_from\r\n";
$headers .= "Reply-To: $visitor_email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Basic validation
if (empty($name) || empty($visitor_email) || empty($subject) || empty($message)) {
    die("All fields are required.");
}

if (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    header("Location: contact.html?status=success");
} else {
    header("Location: contact.html?status=error");
}
exit();
?>