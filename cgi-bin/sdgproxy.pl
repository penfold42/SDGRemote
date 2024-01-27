#!/usr/bin/perl -w
use IO::Socket::INET;

delete @ENV{qw(IFS CDPATH ENV BASH_ENV)};   # Make %ENV safer
use CGI;


##################### GLOBAL VARS  #####################

sub print_response {
	my $status = $_[0];
	my $response = $_[1];

	if ($cmd eq "scdp") {
		print $cgi_query->header( 
			-type => 'image/bmp',
			-access_control_allow_origin => '*',
			-status => $status,
		);
	} else {
		print $cgi_query->header(
			-type => 'text/html',
			-access_control_allow_origin => '*',
			-status => $status,
		);
	}

	binmode STDOUT;
	print $response;
}

##################### MAIN CODE STARTS HERE ####################

$cgi_query = new CGI;

$device_name = $cgi_query->param('device');
$cmd = $cgi_query->param('cmd');

$method = $cgi_query->request_method();
#print STDERR ("got request $method");
if ($method eq "OPTIONS") {
	print_response (200, "");
}

if ( ! defined $device_name ) {
	$device_name="siggen.home";
}
if ( ! defined $cmd ) {
	$cmd="*idn?";
}

# auto-flush on socket
$| = 1;

my $socket = new IO::Socket::INET (
    PeerHost => "$device_name",
    PeerPort => '5025',
    Proto => 'tcp',
);
if (! $socket) {
	print_response (400, "error connectng to $device_name $!\n");
	exit(0);
}

# data to send to a server
my $req = "$cmd\n";
my $size = $socket->send($req);

# notify server that request has been sent
shutdown($socket, 1);


$response="";
$thislen=1;
while($thislen > 0) {
	my $responsebit = "";
	$socket->recv($responsebit, 2048);
	$response .= $responsebit;
	$thislen = length($responsebit);
}
$socket->close();

print_response( 200, $response );


