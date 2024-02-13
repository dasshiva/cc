%define r0 0
%define r1 1
%define r2 2
%define r3 3
%define r4 4
%define r5 5
%define r6 6
%define r7 7

%macro add 2
	db (%1 << 3) | %2
%endmacro

%macro sub 2
        db 1 << 6 | (%1 << 3) | %2
%endmacro

%macro ldr 2
        db 2 << 6 | (%1 << 3) | %2
%endmacro

%macro str 2
        db 3 << 6 | (%1 << 3) | %2
%endmacro

add r0, r1
add r5, r6
sub r1, r2
