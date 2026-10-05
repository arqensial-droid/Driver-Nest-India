<?php
/**
 * On Time Driver Service - Hostinger Production Lead Endpoint
 * Endpoint: /api/leads.php
 * Handles lead processing, persistent storage, and email delivery on Hostinger PHP servers.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status' => 'healthy',
        'service' => 'On Time Driver Service Lead API (Hostinger PHP)',
        'targetEmail' => 'info@ontimedriverservice.com',
        'phone' => '8652880057'
    ]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Use POST.']);
    exit;
}

// 1. Read Raw Input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    $data = $_POST;
}

$name = isset($data['name']) ? trim($data['name']) : '';
$phone = isset($data['phone']) ? trim($data['phone']) : (isset($data['mobile']) ? trim($data['mobile']) : '');
$email = isset($data['email']) ? trim($data['email']) : 'Not provided';
$location = isset($data['location']) ? trim($data['location']) : '';
$serviceType = isset($data['serviceType']) ? trim($data['serviceType']) : (isset($data['service_type']) ? trim($data['service_type']) : '');
$date = isset($data['date']) ? trim($data['date']) : date('Y-m-d');
$time = isset($data['time']) ? trim($data['time']) : 'Immediate / Flexible';
$vehicle = isset($data['vehicle']) ? trim($data['vehicle']) : (isset($data['vehicleType']) ? trim($data['vehicleType']) : 'Sedan / SUV');
$message = isset($data['message']) ? trim($data['message']) : 'No additional message';
$sourcePage = isset($data['sourcePage']) ? trim($data['sourcePage']) : (isset($data['source_page']) ? trim($data['source_page']) : '/');
$formName = isset($data['formName']) ? trim($data['formName']) : (isset($data['form_name']) ? trim($data['form_name']) : 'Website Lead Form');
$submittedAt = isset($data['submittedAt']) ? trim($data['submittedAt']) : date('d/m/Y, h:i:s A') . ' IST';

// 2. Validate Inputs
if (strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter your full name (minimum 2 characters).']);
    exit;
}

$cleanPhone = preg_replace('/\D/', '', $phone);
if (strlen($cleanPhone) === 12 && substr($cleanPhone, 0, 2) === '91') {
    $cleanPhone = substr($cleanPhone, 2);
} elseif (strlen($cleanPhone) === 11 && substr($cleanPhone, 0, 1) === '0') {
    $cleanPhone = substr($cleanPhone, 1);
}

if (strlen($cleanPhone) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter a valid 10-digit Indian mobile number.']);
    exit;
}

if (empty($location)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please enter your pickup location.']);
    exit;
}

if (empty($serviceType)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please select a driver service type.']);
    exit;
}

// 3. Prepare Lead Record
$leadId = 'OTD-' . strtoupper(substr(uniqid(), -6)) . '-' . rand(1000, 9999);
$newLead = [
    'id' => $leadId,
    'name' => $name,
    'phone' => $cleanPhone,
    'mobile' => $cleanPhone,
    'email' => $email,
    'location' => $location,
    'service_type' => $serviceType,
    'serviceType' => $serviceType,
    'date' => $date,
    'time' => $time,
    'vehicle' => $vehicle,
    'message' => $message,
    'source_page' => $sourcePage,
    'sourcePage' => $sourcePage,
    'form_name' => $formName,
    'formName' => $formName,
    'created_at' => date('c'),
    'timestamp' => $submittedAt,
    'email_status' => 'PENDING'
];

// 4. Save to Persistent JSON Storage
$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}
$leadsFile = $dataDir . '/leads.json';
$leads = [];
if (file_exists($leadsFile)) {
    $raw = @file_get_contents($leadsFile);
    $leads = json_decode($raw, true) ?: [];
}
array_unshift($leads, $newLead);
@file_put_contents($leadsFile, json_encode(array_slice($leads, 0, 1000), JSON_PRETTY_PRINT));

// 5. Send Notification Email
$adminEmail = 'info@ontimedriverservice.com';
$emailSubject = "New Driver Booking Lead - On Time Driver Service";

$emailBody = "ON TIME DRIVER SERVICE - NEW DRIVER BOOKING LEAD\n\n";
$emailBody .= "Customer Name: {$name}\n";
$emailBody .= "Mobile Number: +91 {$cleanPhone}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "Location: {$location}\n";
$emailBody .= "Service Type: {$serviceType}\n";
$emailBody .= "Date & Time: {$date} at {$time}\n";
$emailBody .= "Vehicle Details: {$vehicle}\n";
$emailBody .= "Message: {$message}\n";
$emailBody .= "Page URL: {$sourcePage}\n";
$emailBody .= "Lead Source: {$formName}\n";
$emailBody .= "Timestamp: {$submittedAt}\n";
$emailBody .= "Lead ID: {$leadId}\n";

$headers = "From: On Time Driver Service <info@ontimedriverservice.com>\r\n" .
           "Reply-To: " . ($email !== 'Not provided' ? $email : 'info@ontimedriverservice.com') . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

$mailSent = @mail($adminEmail, $emailSubject, $emailBody, $headers);
$newLead['email_status'] = $mailSent ? 'SENT_PHP_MAIL' : 'SAVED_MAIL_ATTEMPTED';

// Update file with final email status
$leads[0] = $newLead;
@file_put_contents($leadsFile, json_encode(array_slice($leads, 0, 1000), JSON_PRETTY_PRINT));

// 6. Return Success Response
http_response_code(200);
echo json_encode([
    'success' => true,
    'leadId' => $leadId,
    'message' => 'Thank you for your enquiry. Our team will contact you shortly.',
    'lead' => [
        'id' => $leadId,
        'name' => $name,
        'phone' => $cleanPhone,
        'location' => $location,
        'serviceType' => $serviceType
    ],
    'emailStatus' => $newLead['email_status']
]);
