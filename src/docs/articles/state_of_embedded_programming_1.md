---
title: "State of Embedded Programming Part I"
slug: state-of-embedded-programming-part-1
layout: page
published_at: 2017-07-28
article: true
tags:
    - embedded
    - education
    - information
    - programming
    - experiment
---

Let’s start with some background. So you want to get in on the new “cool” hardware platforms out there from the Pi's, Arduino's, Pine64, letting you build everything from drones, robots to even mundane things like 'smart tv', routers, http servers on extremely efficient low power devices

If you have something that has linux already then yes, you can pretty much write everything using the tools that you know and love. But if you want to do something more i.e "real embedded" programming ;), then this series of articles is for you. My aim is to help you get down and dirty and have a look at the principles of embedded programming.

### Beginning Embedded Programming

Programming in the embedded world basically means that you work at a much lower level of abstraction than in the regular world. Unlike working with regular machines, you need to deep dive into how the system that you're working with is actually connected. 

Let's try to understand embedded programming by looking at our standard "Hello, World" running under Linux vs the equivalent "Hello, World" of the embedded world which is Blinking an LED writing directly on the chip itself.


<table class="table table-bordered table-responsive">
<tr>
    <th>Hello World Assembly Linux :</th>
    <th>Blinking LED in Atmel 8051 :</th>
</tr>
<tr>
    <td>
        <script src="https://gist.github.com/zeroth/fce61d64485043ae40950398d2a6b2cf.js?file=hello_world.S"></script>
    </td>
    <td>
        <script src="https://gist.github.com/zeroth/fce61d64485043ae40950398d2a6b2cf.js?file=hello_world_at8051.S"></script>
    </td>
</tr>
</table>           

If you look at the Linux assembly code, the highlighted section

```
     mov     edx,len                            
     mov     ecx,msg       ;message to write
     mov     ebx,1         ;file descriptor (stdout)
     mov     eax,4         ;system call number (sys_write)
     int     0x80          ;call kernel
```
It’s actually a function call sys_write which is implemented by Linux and we are just calling it. We don’t know to which port/pin of the board the monitor is connected that is taken care by the sys_write system call (kernel function).

But when you look at the Blink LED programs

```
        MOV P1, #01H    ; move 00000001 to PORT1
        CALL delay      ; execute delay
        MOV A, P1       ; move PORT1 value to an accumulator
        CPL A           ; complement PORT1 value
        MOV P1, A       ; move 11111110 to PORT1
        CALL delay      ; execute delay
```
We are specifying that LED which is connected to PORT1’s  First PIN make it high logical 1 by writing binary 1 to the PORT1 register  then call a delay function which we have defined below,
then we move the value port1 to the Accumulator and so on. 

The takeaway is when we write a pure embedded program we have to have detailed knowledge about the hardware we are writing a program for.

Let’s start with something fundamental, the differences between the microprocessor (μP) and micro-controller ( μC ). 

### Microprocessor vs Microcontroller vs System on Chip ( μP vs μC vs SOC)

**Microprocessor** is an IC which has only the CPU inside them i.e. only the processing powers such as Intel’s Pentium 1,2,3,4, core 2 duo, i3, i5 etc. These microprocessors don’t have RAM, ROM, and other peripheral on the chip.A system designer has to add them externally to make them functional. Microprocessors are generally used in Desktop PC’s, Laptops, notepads etc.
 
**Micro-controller** on other hand has a CPU, in addition to a fixed amount of RAM, ROM and other peripherals all embedded on a single chip. At times it is also termed as a mini computer or a computer on a single chip. Today different manufacturers produce microcontrollers with a wide range of features available in different versions. Some manufacturers are ATMEL, Microchip, TI, Freescale, Philips, Motorola etc. Usually, these chips developed for specific industries ranging from automotive, industrial and even space.

**System on Chip (SOC)**  is technically a micro-controller, except its a chip which contains almost entire motherboard on a chip. It’s different approach in embedded system world to add more peripherals in one chip depending upon the manufacturer its variety what is on this chip but some of the common things are GPU, WiFi, USB, FireWire, Ethernet, USART, SPI , GSM and lot more 

We will be focusing mostly on the μC & SOC in this article

### The backbone of chips - The Boards - The Crux of Embedded Computing

Fundamentally, the micro-controllers and microprocessors are designed to take input, process it and give output. To perform this task every microcontroller and processor have its own electronics specification that defines which ports can be connected to RAM, ROM and different peripherals like Keyboard, Monitor etc.  To connect all this with micro-controller or processor we have to design and develop the electronics circuit boards. 

In desktop computers, we call them Motherboards. Motherboards have standard designs based on chipset which controls what is connected where and it remains the same no matters who is manufacturing the motherboard. 

Because of the standardization in the desktop market you can (almost all the time) change a motherboard of your machine from one manufacturer to another with same old hard drive and which has your OS installed and your machine will work without much of an issue* (there are always exceptions but this is the general idea). 

But when it comes to SOC / Microcontrollers it's not the same story because every manufacturer has their own standards and is designed for specific kind of applications.

There are lots of embedded system development boards which runs Linux, but interestingly there is no standardization at the board level. Though at the processor level, most of them use ARM core, however the ports/addresses where the keyboard, ram, mouse, and screen are connected are not part of any specific standard.

The exciting part, however, is that there are lots of initiatives in standardizing programming on embedded systems world. 

Part II coming soon...