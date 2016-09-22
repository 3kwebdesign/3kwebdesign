<?php
	require_once 'swiftmailer/swift_required.php';

	$transport = Swift_MailTransport::newInstance();

	$message = Swift_Message::newInstance();
	$message->setTo('dankrul.krul@gmail.com');
	$message->setSubject($_POST['mailSubject']);
	$message->setBody($_POST['message']);
	$message->setFrom($_POST['mailSenderMail'], $_POST['mailSender']);

	// Send the email
	$mailer = Swift_Mailer::newInstance($transport);
	if($mailer->send($message)){
		echo 'ok';
	} else {
		echo $mailer->send($message);
	}
?>