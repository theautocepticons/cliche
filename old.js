// ============================================================
// Command Line Cheat Sheet v2.1 - JavaScript Functions
// ============================================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================================
    // PAGE UTILITIES
    // ============================================================

    // Change Page Color
    function changeColor() {
        let color = document.getElementById('colorSelection').value;
        document.body.style.backgroundColor = color;
        document.getElementById('colorTextbox').value = color;
    }
    window.changeColor = changeColor;

    // Sticky Header Functionality
    window.onscroll = function() {
        myFunction();
    };

    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    // ============================================================
    // MASS BLADE REPLICATION
    // ============================================================

    function CopyFields() {
        var text = document.getElementById("MassReplicate");
        var text1 = document.getElementById("CMLedOn2");
        var text2 = document.getElementById("CMLedOff2");
        var text3 = document.getElementById("CMPowOn2");
        var text4 = document.getElementById("CMPowOff2");
        var text5 = document.getElementById("GBI2");
        var text6 = document.getElementById("SBS2");
        var text7 = document.getElementById("SPBS2");
        var text8 = document.getElementById("RBL2");
        var text9 = document.getElementById("CBL2");
        var text10 = document.getElementById("GBM2");
        var text11 = document.getElementById("PCB2");
        var text12 = document.getElementById("GBW2");
        var text13 = document.getElementById("GBA2");
        var text14 = document.getElementById("BTU2");
        var text15 = document.getElementById("BTB2");
        var text16 = document.getElementById("BTP2");
        var text17 = document.getElementById("GBHM2");
        var text18 = document.getElementById("GBHC2");
        var text19 = document.getElementById("GBHJ2");
        var text20 = document.getElementById("GBHP2");
        var text21 = document.getElementById("GBHS2");
        var text22 = document.getElementById("GBHT2");
        var text23 = document.getElementById("GBHF2");
        var text24 = document.getElementById("GBBC2");
        var text25 = document.getElementById("CGN2");
        var text26 = document.getElementById("CAZ2");
        var text27 = document.getElementById("CAH2");
        var text28 = document.getElementById("CAS2");
        var text29 = document.getElementById("CAT2");
        var text30 = document.getElementById("CAX2");
        var text31 = document.getElementById("CAY2");
        var text32 = document.getElementById("CAA2");
        var text33 = document.getElementById("CAI2");
        var text34 = document.getElementById("CBA2");
        var text35 = document.getElementById("CBB2");
        var text36 = document.getElementById("CBC2");
        var text37 = document.getElementById("CEA2");
        var text38 = document.getElementById("CPA2");
        var text39 = document.getElementById("RMSBS2");
        var text40 = document.getElementById("RMSPBS2");
        var text41 = document.getElementById("VBBI2");
        var text42 = document.getElementById("VBI2");
        var text43 = document.getElementById("RRBL2");
        var text44 = document.getElementById("RCBL2");
        var text45 = document.getElementById("RMSBS2");
        var text46 = document.getElementById("RMGFS2");
        var text47 = document.getElementById("RMPCB2");
        var text48 = document.getElementById("RMGBW2");
        var text49 = document.getElementById("RMBTU2");
        var text50 = document.getElementById("RMBTB2");
        var text51 = document.getElementById("RMBTP2");
        var text52 = document.getElementById("RGBHS2");
        var text53 = document.getElementById("RGBHM2");
        var text54 = document.getElementById("RGBHC2");
        var text55 = document.getElementById("RGBHP2");
        var text56 = document.getElementById("RGBHA2");
        var text57 = document.getElementById("RGBHP2");
        var text58 = document.getElementById("RGBHF2");
        var text59 = document.getElementById("RGBHT2");
        var text60 = document.getElementById("RGBHR2");
        var text61 = document.getElementById("RGBHN2");
        var text62 = document.getElementById("RGBBC2");
        var text63 = document.getElementById("RGN2");
        var text64 = document.getElementById("RAZ2");
        var text65 = document.getElementById("RAU2");
        var text66 = document.getElementById("RAG2");
        var text67 = document.getElementById("RAT2");
        var text68 = document.getElementById("RAS2");
        var text69 = document.getElementById("RAO2");
        var text70 = document.getElementById("RAC2");

        text1.value = text.value;
        text2.value = text.value;
        text3.value = text.value;
        text4.value = text.value;
        text5.value = text.value;
        text6.value = text.value;
        text7.value = text.value;
        text8.value = text.value;
        text9.value = text.value;
        text10.value = text.value;
        text11.value = text.value;
        text12.value = text.value;
        text13.value = text.value;
        text14.value = text.value;
        text15.value = text.value;
        text16.value = text.value;
        text17.value = text.value;
        text18.value = text.value;
        text19.value = text.value;
        text20.value = text.value;
        text21.value = text.value;
        text22.value = text.value;
        text23.value = text.value;
        text24.value = text.value;
        text25.value = text.value;
        text26.value = text.value;
        text27.value = text.value;
        text28.value = text.value;
        text29.value = text.value;
        text30.value = text.value;
        text31.value = text.value;
        text32.value = text.value;
        text33.value = text.value;
        text34.value = text.value;
        text35.value = text.value;
        text36.value = text.value;
        text37.value = text.value;
        text38.value = text.value;
        text39.value = text.value;
        text40.value = text.value;
        text41.value = text.value;
        text42.value = text.value;
        text43.value = text.value;
        text44.value = text.value;
        text45.value = text.value;
        text46.value = text.value;
        text47.value = text.value;
        text48.value = text.value;
        text49.value = text.value;
        text50.value = text.value;
        text51.value = text.value;
        text52.value = text.value;
        text53.value = text.value;
        text54.value = text.value;
        text55.value = text.value;
        text56.value = text.value;
        text57.value = text.value;
        text58.value = text.value;
        text59.value = text.value;
        text60.value = text.value;
        text61.value = text.value;
        text62.value = text.value;
        text63.value = text.value;
        text64.value = text.value;
        text65.value = text.value;
        text66.value = text.value;
        text67.value = text.value;
        text68.value = text.value;
        text69.value = text.value;
        text70.value = text.value;
    }
    window.CopyFields = CopyFields;

    // ============================================================
    // CM DEFAULT LOGIN FUNCTIONS
    // ============================================================

    function myFunction1() {
        var copyText = document.getElementById("AdminSplendid");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction1 = myFunction1;

    function myFunction2() {
        var copyText = document.getElementById("AdministratorSplendid");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction2 = myFunction2;

    function myFunction3() {
        var copyText = document.getElementById("AdminRd!");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction3 = myFunction3;

    function myFunction4() {
        var copyText = document.getElementById("AdminRd!local");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction4 = myFunction4;

    // ============================================================
    // CM GENERATED LOGIN FUNCTIONS
    // ============================================================

    function myFunction5() {
        var copyText = document.getElementById("AdminCreds1");
        var copyText2 = document.getElementById("AdminCreds2");
        var output = document.getElementById("AdminCredsOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction5 = myFunction5;

    function myFunction6() {
        var copyText = document.getElementById("WscCreds1");
        var copyText2 = document.getElementById("WscCreds2");
        var output = document.getElementById("WscCredsOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction6 = myFunction6;

    function myFunction7() {
        var copyText = document.getElementById("RootCreds1");
        var copyText2 = document.getElementById("RootCreds2");
        var output = document.getElementById("RootCredsOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction7 = myFunction7;

    function myFunctionBFCOFF() {
        var copyText = document.getElementById("BFCOFF1");
        var copyText2 = document.getElementById("BFCOFF3");
        var copyText3 = document.getElementById("BFCOFF2");
        var copyText4 = document.getElementById("BFCOFF4");
        var output = document.getElementById("BFCOFFOutput");
        output.value = copyText.value + copyText2.value + copyText3.value + copyText4.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionBFCOFF = myFunctionBFCOFF;

    function myFunctionBFCON() {
        var copyText = document.getElementById("BFCON1");
        var copyText2 = document.getElementById("BFCON3");
        var copyText3 = document.getElementById("BFCON2");
        var copyText4 = document.getElementById("BFCON4");
        var output = document.getElementById("BFCONOutput");
        output.value = copyText.value + copyText2.value + copyText3.value + copyText4.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionBFCON = myFunctionBFCON;

    // ============================================================
    // CM BLADE BASIC FUNCTIONS
    // ============================================================

    function myFunction8() {
        var copyText = document.getElementById("CMLedOn1");
        var copyText2 = document.getElementById("CMLedOn2");
        var output = document.getElementById("CMLedOnOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction8 = myFunction8;

    function myFunction9() {
        var copyText = document.getElementById("CMLedOff1");
        var copyText2 = document.getElementById("CMLedOff2");
        var output = document.getElementById("CMLedOffOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction9 = myFunction9;

    function myFunction72() {
        var copyText = document.getElementById("CMPowOn1");
        var copyText2 = document.getElementById("CMPowOn2");
        var output = document.getElementById("CMPowOnOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction72 = myFunction72;

    function myFunction10() {
        var copyText = document.getElementById("CMPowOff1");
        var copyText2 = document.getElementById("CMPowOff2");
        var output = document.getElementById("CMPowOffOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction10 = myFunction10;

    function myFunction11() {
        var copyText = document.getElementById("GBI1");
        var copyText2 = document.getElementById("GBI2");
        var output = document.getElementById("GBIOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction11 = myFunction11;

    function myFunction12() {
        var copyText = document.getElementById("SBS1");
        var copyText2 = document.getElementById("SBS2");
        var output = document.getElementById("SBSOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction12 = myFunction12;

    function myFunction13() {
        var copyText = document.getElementById("SPBS1");
        var copyText2 = document.getElementById("SPBS2");
        var output = document.getElementById("SPBSOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction13 = myFunction13;

    function myFunction14() {
        var copyText = document.getElementById("RBL1");
        var copyText2 = document.getElementById("RBL2");
        var output = document.getElementById("RBLOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction14 = myFunction14;

    function myFunction15() {
        var copyText = document.getElementById("CBL1");
        var copyText2 = document.getElementById("CBL2");
        var output = document.getElementById("CBLOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction15 = myFunction15;

    function myFunction16() {
        var copyText = document.getElementById("GBM1");
        var copyText2 = document.getElementById("GBM2");
        var output = document.getElementById("GBMOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction16 = myFunction16;

    function myFunction17() {
        var copyText = document.getElementById("PCB1");
        var copyText2 = document.getElementById("PCB2");
        var output = document.getElementById("PCBOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction17 = myFunction17;

    function myFunctionGBW() {
        var copyText = document.getElementById("GBW1");
        var copyText2 = document.getElementById("GBW2");
        var output = document.getElementById("GBWOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionGBW = myFunctionGBW;

    function myFunctionGBA() {
        var copyText = document.getElementById("GBA1");
        var copyText2 = document.getElementById("GBA2");
        var output = document.getElementById("GBAOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionGBA = myFunctionGBA;

    function myFunction18() {
        var copyText = document.getElementById("BTU1");
        var copyText2 = document.getElementById("BTU2");
        var copyText3 = document.getElementById("BTU3");
        var output = document.getElementById("BTUOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction18 = myFunction18;

    function myFunction19() {
        var copyText = document.getElementById("BTB1");
        var copyText2 = document.getElementById("BTB2");
        var copyText3 = document.getElementById("BTB3");
        var output = document.getElementById("BTBOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction19 = myFunction19;

    function myFunction20() {
        var copyText = document.getElementById("BTP1");
        var copyText2 = document.getElementById("BTP2");
        var copyText3 = document.getElementById("BTP3");
        var output = document.getElementById("BTPOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction20 = myFunction20;

    // ============================================================
    // CM BLADE HEALTH FUNCTIONS
    // ============================================================

    function myFunction30() {
        var copyText = document.getElementById("GBHM1");
        var copyText2 = document.getElementById("GBHM2");
        var copyText3 = document.getElementById("GBHM3");
        var output = document.getElementById("GBHMOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction30 = myFunction30;

    function myFunction31() {
        var copyText = document.getElementById("GBHC1");
        var copyText2 = document.getElementById("GBHC2");
        var copyText3 = document.getElementById("GBHC3");
        var output = document.getElementById("GBHCOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction31 = myFunction31;

    function myFunction32() {
        var copyText = document.getElementById("GBHJ1");
        var copyText2 = document.getElementById("GBHJ2");
        var copyText3 = document.getElementById("GBHJ3");
        var output = document.getElementById("GBHJOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction32 = myFunction32;

    function myFunction33() {
        var copyText = document.getElementById("GBHP1");
        var copyText2 = document.getElementById("GBHP2");
        var copyText3 = document.getElementById("GBHP3");
        var output = document.getElementById("GBHPOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction33 = myFunction33;

    function myFunction34() {
        var copyText = document.getElementById("GBHS1");
        var copyText2 = document.getElementById("GBHS2");
        var copyText3 = document.getElementById("GBHS3");
        var output = document.getElementById("GBHSOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction34 = myFunction34;

    function myFunction35() {
        var copyText = document.getElementById("GBHT1");
        var copyText2 = document.getElementById("GBHT2");
        var copyText3 = document.getElementById("GBHT3");
        var output = document.getElementById("GBHTOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction35 = myFunction35;

    function myFunction36() {
        var copyText = document.getElementById("GBHF1");
        var copyText2 = document.getElementById("GBHF2");
        var copyText3 = document.getElementById("GBHF3");
        var output = document.getElementById("GBHFOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction36 = myFunction36;

    // ============================================================
    // CM BIOS FLAVORS FUNCTIONS
    // ============================================================

    function myFunction46() {
        var copyText = document.getElementById("GBBC1");
        var copyText2 = document.getElementById("GBBC2");
        var output = document.getElementById("GBBCOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction46 = myFunction46;

    function myFunction47() {
        var copyText = document.getElementById("CGN1");
        var copyText2 = document.getElementById("CGN2");
        var copyText3 = document.getElementById("CGN3");
        var output = document.getElementById("CGNOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction47 = myFunction47;

    function myFunction48() {
        var copyText = document.getElementById("CAZ1");
        var copyText2 = document.getElementById("CAZ2");
        var copyText3 = document.getElementById("CAZ3");
        var output = document.getElementById("CAZOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction48 = myFunction48;

    function myFunction49() {
        var copyText = document.getElementById("CAH1");
        var copyText2 = document.getElementById("CAH2");
        var copyText3 = document.getElementById("CAH3");
        var output = document.getElementById("CAHOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction49 = myFunction49;

    function myFunction50() {
        var copyText = document.getElementById("CAS1");
        var copyText2 = document.getElementById("CAS2");
        var copyText3 = document.getElementById("CAS3");
        var output = document.getElementById("CASOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction50 = myFunction50;

    function myFunction51() {
        var copyText = document.getElementById("CAT1");
        var copyText2 = document.getElementById("CAT2");
        var copyText3 = document.getElementById("CAT3");
        var output = document.getElementById("CATOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction51 = myFunction51;

    function myFunction52() {
        var copyText = document.getElementById("CAX1");
        var copyText2 = document.getElementById("CAX2");
        var copyText3 = document.getElementById("CAX3");
        var output = document.getElementById("CAXOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction52 = myFunction52;

    function myFunction53() {
        var copyText = document.getElementById("CAY1");
        var copyText2 = document.getElementById("CAY2");
        var copyText3 = document.getElementById("CAY3");
        var output = document.getElementById("CAYOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction53 = myFunction53;

    function myFunction54() {
        var copyText = document.getElementById("CAA1");
        var copyText2 = document.getElementById("CAA2");
        var copyText3 = document.getElementById("CAA3");
        var output = document.getElementById("CAAOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction54 = myFunction54;

    function myFunction55() {
        var copyText = document.getElementById("CAI1");
        var copyText2 = document.getElementById("CAI2");
        var copyText3 = document.getElementById("CAI3");
        var output = document.getElementById("CAIOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction55 = myFunction55;

    function myFunction56() {
        var copyText = document.getElementById("CBA1");
        var copyText2 = document.getElementById("CBA2");
        var copyText3 = document.getElementById("CBA3");
        var output = document.getElementById("CBAOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction56 = myFunction56;

    function myFunction57() {
        var copyText = document.getElementById("CBB1");
        var copyText2 = document.getElementById("CBB2");
        var copyText3 = document.getElementById("CBB3");
        var output = document.getElementById("CBBOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction57 = myFunction57;

    function myFunction58() {
        var copyText = document.getElementById("CBC1");
        var copyText2 = document.getElementById("CBC2");
        var copyText3 = document.getElementById("CBC3");
        var output = document.getElementById("CBCOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction58 = myFunction58;

    function myFunction59() {
        var copyText = document.getElementById("CEA1");
        var copyText2 = document.getElementById("CEA2");
        var copyText3 = document.getElementById("CEA3");
        var output = document.getElementById("CEAOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction59 = myFunction59;

    function myFunction60() {
        var copyText = document.getElementById("CPA1");
        var copyText2 = document.getElementById("CPA2");
        var copyText3 = document.getElementById("CPA3");
        var output = document.getElementById("CPAOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction60 = myFunction60;

    // ============================================================
    // CM BASIC COMMANDS
    // ============================================================

    function myFunction21() {
        var copyText = document.getElementById("CMH");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction21 = myFunction21;

    function myFunction22() {
        var copyText = document.getElementById("CMI");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction22 = myFunction22;

    function myFunctionCMPSU() {
        var copyText = document.getElementById("CMPSU");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionCMPSU = myFunctionCMPSU;

    function myFunctionCMPSU2() {
        var copyText = document.getElementById("CMPSU2");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionCMPSU2 = myFunctionCMPSU2;

    function myFunctionCMFI() {
        var copyText = document.getElementById("CMFI");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionCMFI = myFunctionCMFI;

    function myFunction23() {
        var copyText = document.getElementById("CMDHCP");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction23 = myFunction23;

    function myFunction24() {
        var copyText = document.getElementById("CMSTATIC1");
        var copyText2 = document.getElementById("CMSTATIC2");
        var copyText3 = document.getElementById("CMSTATIC3");
        var copyText4 = document.getElementById("CMSTATIC4");
        var copyText5 = document.getElementById("CMSTATIC5");
        var copyText6 = document.getElementById("CMSTATIC6");
        var output = document.getElementById("CMSTATICOutput");
        output.value = copyText.value + copyText2.value + copyText3.value + copyText4.value + copyText5.value + copyText6.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction24 = myFunction24;

    // ============================================================
    // RM BLADE BASIC FUNCTIONS
    // ============================================================

    function myFunction25() {
        var copyText = document.getElementById("RMSBS1");
        var copyText2 = document.getElementById("RMSBS2");
        var output = document.getElementById("RMSBSOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction25 = myFunction25;

    function myFunction26() {
        var copyText = document.getElementById("RMSPBS1");
        var copyText2 = document.getElementById("RMSPBS2");
        var output = document.getElementById("RMSPBSOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction26 = myFunction26;

    function myFunctionVBBI() {
        var copyText = document.getElementById("VBBI1");
        var copyText2 = document.getElementById("VBBI2");
        var output = document.getElementById("VBBIOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionVBBI = myFunctionVBBI;

    function myFunction27() {
        var copyText = document.getElementById("VBI1");
        var copyText2 = document.getElementById("VBI2");
        var output = document.getElementById("VBIOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction27 = myFunction27;

    function myFunction28a() {
        var copyText = document.getElementById("RRBL1");
        var copyText2 = document.getElementById("RRBL2");
        var output = document.getElementById("RRBLOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction28a = myFunction28a;

    function myFunction29() {
        var copyText = document.getElementById("RCBL1");
        var copyText2 = document.getElementById("RCBL2");
        var output = document.getElementById("RCBLOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction29 = myFunction29;

    function myFunctionRMGFS() {
        var copyText = document.getElementById("RMGFS1");
        var copyText2 = document.getElementById("RMGFS2");
        var output = document.getElementById("RMGFSOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMGFS = myFunctionRMGFS;

    function myFunctionRMPCB() {
        var copyText = document.getElementById("RMPCB1");
        var copyText2 = document.getElementById("RMPCB2");
        var output = document.getElementById("RMPCBOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMPCB = myFunctionRMPCB;

    function myFunctionRMGBW() {
        var copyText = document.getElementById("RMGBW1");
        var copyText2 = document.getElementById("RMGBW2");
        var output = document.getElementById("RMGBWOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMGBW = myFunctionRMGBW;

    function myFunctionRMBTU() {
        var copyText = document.getElementById("RMBTU1");
        var copyText2 = document.getElementById("RMBTU2");
        var copyText3 = document.getElementById("RMBTU3");
        var output = document.getElementById("RMBTUOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMBTU = myFunctionRMBTU;

    function myFunctionRMBTB() {
        var copyText = document.getElementById("RMBTB1");
        var copyText2 = document.getElementById("RMBTB2");
        var copyText3 = document.getElementById("RMBTB3");
        var output = document.getElementById("RMBTBOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMBTB = myFunctionRMBTB;

    function myFunctionRMBTP() {
        var copyText = document.getElementById("RMBTP1");
        var copyText2 = document.getElementById("RMBTP2");
        var copyText3 = document.getElementById("RMBTP3");
        var output = document.getElementById("RMBTPOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMBTP = myFunctionRMBTP;

    // ============================================================
    // RM BLADE HEALTH FUNCTIONS
    // ============================================================

    function myFunction37() {
        var copyText = document.getElementById("RGBHS1");
        var copyText2 = document.getElementById("RGBHS2");
        var copyText3 = document.getElementById("RGBHS3");
        var output = document.getElementById("RGBHSOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction37 = myFunction37;

    function myFunction38() {
        var copyText = document.getElementById("RGBHM1");
        var copyText2 = document.getElementById("RGBHM2");
        var copyText3 = document.getElementById("RGBHM3");
        var output = document.getElementById("RGBHMOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction38 = myFunction38;

    function myFunction39() {
        var copyText = document.getElementById("RGBHC1");
        var copyText2 = document.getElementById("RGBHC2");
        var copyText3 = document.getElementById("RGBHC3");
        var output = document.getElementById("RGBHCOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction39 = myFunction39;

    function myFunction40() {
        var copyText = document.getElementById("RGBHP1");
        var copyText2 = document.getElementById("RGBHP2");
        var copyText3 = document.getElementById("RGBHP3");
        var output = document.getElementById("RGBHPOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction40 = myFunction40;

    function myFunction41() {
        var copyText = document.getElementById("RGBHA1");
        var copyText2 = document.getElementById("RGBHA2");
        var copyText3 = document.getElementById("RGBHA3");
        var output = document.getElementById("RGBHAOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction41 = myFunction41;

    function myFunction42() {
        var copyText = document.getElementById("RGBHF1");
        var copyText2 = document.getElementById("RGBHF2");
        var copyText3 = document.getElementById("RGBHF3");
        var output = document.getElementById("RGBHFOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction42 = myFunction42;

    function myFunction43() {
        var copyText = document.getElementById("RGBHT1");
        var copyText2 = document.getElementById("RGBHT2");
        var copyText3 = document.getElementById("RGBHT3");
        var output = document.getElementById("RGBHTOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction43 = myFunction43;

    function myFunction44() {
        var copyText = document.getElementById("RGBHR1");
        var copyText2 = document.getElementById("RGBHR2");
        var copyText3 = document.getElementById("RGBHR3");
        var output = document.getElementById("RGBHROutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction44 = myFunction44;

    function myFunction45() {
        var copyText = document.getElementById("RGBHN1");
        var copyText2 = document.getElementById("RGBHN2");
        var copyText3 = document.getElementById("RGBHN3");
        var output = document.getElementById("RGBHNOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction45 = myFunction45;

    // ============================================================
    // RM BIOS FLAVORS FUNCTIONS
    // ============================================================

    function myFunctionGBBC() {
        var copyText = document.getElementById("RGBBC1");
        var copyText2 = document.getElementById("RGBBC2");
        var output = document.getElementById("RGBBCOutput");
        output.value = copyText.value + copyText2.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionGBBC = myFunctionGBBC;

    function myFunction61() {
        var copyText = document.getElementById("RGN1");
        var copyText2 = document.getElementById("RGN2");
        var copyText3 = document.getElementById("RGN3");
        var output = document.getElementById("RGNOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction61 = myFunction61;

    function myFunction62() {
        var copyText = document.getElementById("RAZ1");
        var copyText2 = document.getElementById("RAZ2");
        var copyText3 = document.getElementById("RAZ3");
        var output = document.getElementById("RAZOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction62 = myFunction62;

    function myFunction63() {
        var copyText = document.getElementById("RAU1");
        var copyText2 = document.getElementById("RAU2");
        var copyText3 = document.getElementById("RAU3");
        var output = document.getElementById("RAUOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction63 = myFunction63;

    function myFunction64() {
        var copyText = document.getElementById("RAG1");
        var copyText2 = document.getElementById("RAG2");
        var copyText3 = document.getElementById("RAG3");
        var output = document.getElementById("RAGOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction64 = myFunction64;

    function myFunction65() {
        var copyText = document.getElementById("RAT1");
        var copyText2 = document.getElementById("RAT2");
        var copyText3 = document.getElementById("RAT3");
        var output = document.getElementById("RATOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction65 = myFunction65;

    function myFunction66() {
        var copyText = document.getElementById("RAS1");
        var copyText2 = document.getElementById("RAS2");
        var copyText3 = document.getElementById("RAS3");
        var output = document.getElementById("RASOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction66 = myFunction66;

    function myFunction67() {
        var copyText = document.getElementById("RAO1");
        var copyText2 = document.getElementById("RAO2");
        var copyText3 = document.getElementById("RAO3");
        var output = document.getElementById("RAOOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction67 = myFunction67;

    function myFunction68() {
        var copyText = document.getElementById("RAC1");
        var copyText2 = document.getElementById("RAC2");
        var copyText3 = document.getElementById("RAC3");
        var output = document.getElementById("RACOutput");
        output.value = copyText.value + copyText2.value + copyText3.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunction68 = myFunction68;

    // ============================================================
    // RM BASIC COMMANDS
    // ============================================================

    function myFunctionGRMI() {
        var copyText = document.getElementById("GRMI");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionGRMI = myFunctionGRMI;

    function myFunctionGRMH() {
        var copyText = document.getElementById("GRMH");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionGRMH = myFunctionGRMH;

    function myFunctionSRME0() {
        var copyText = document.getElementById("SRME0");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionSRME0 = myFunctionSRME0;

    function myFunctionSRME1() {
        var copyText = document.getElementById("SRME1");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunctionSRME1 = myFunctionSRME1;

    function myFunctionRMSTATIC01() {
        var copyText = document.getElementById("RMSTATIC01");
        var copyText2 = document.getElementById("RMSTATIC03");
        var copyText3 = document.getElementById("RMSTATIC02");
        var copyText4 = document.getElementById("RMSTATIC05");
        var copyText5 = document.getElementById("RMSTATIC04");
        var copyText6 = document.getElementById("RMSTATIC07");
        var copyText7 = document.getElementById("RMSTATIC06");
        var output = document.getElementById("RMSTATIC01Output");
        output.value = copyText.value + copyText2.value + copyText3.value + copyText4.value + copyText5.value + copyText6.value + copyText7.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMSTATIC01 = myFunctionRMSTATIC01;

    function myFunctionRMSTATIC11() {
        var copyText = document.getElementById("RMSTATIC11");
        var copyText2 = document.getElementById("RMSTATIC13");
        var copyText3 = document.getElementById("RMSTATIC12");
        var copyText4 = document.getElementById("RMSTATIC15");
        var copyText5 = document.getElementById("RMSTATIC14");
        var copyText6 = document.getElementById("RMSTATIC17");
        var copyText7 = document.getElementById("RMSTATIC16");
        var output = document.getElementById("RMSTATIC11Output");
        output.value = copyText.value + copyText2.value + copyText3.value + copyText4.value + copyText5.value + copyText6.value + copyText7.value;
        output.select();
        document.execCommand("copy");
    }
    window.myFunctionRMSTATIC11 = myFunctionRMSTATIC11;

    // ============================================================
    // UPS COMMANDS
    // ============================================================

    function myFunction69() {
        var copyText = document.getElementById("LVer");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction69 = myFunction69;

    function myFunction70() {
        var copyText = document.getElementById("1UD");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction70 = myFunction70;

    function myFunction71() {
        var copyText = document.getElementById("6UD");
        copyText.select();
        document.execCommand("copy");
    }
    window.myFunction71 = myFunction71;

});
