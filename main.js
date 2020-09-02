
function Converter() {
    ButtonSelector("active", "", "", "");

    var url = "https://www.google.com/search?q=" + MinimumRevenue + "+" + currency + "+to+USD";
    window.open(url);
}

function Calculator() {
    ButtonSelector("", "active", "", "");

    document.getElementById("divResult").style.display = "none";
    document.getElementById("divCalculator").style.display = "inline";
    document.getElementById("divInformation").style.display = "none";
}

function YouTube() {
    ButtonSelector("", "", "active", "");
}

function Information() {
    ButtonSelector("", "", "", "active");

    document.getElementById("divResult").style.display = "none";
    document.getElementById("divCalculator").style.display = "none";
    document.getElementById("divInformation").style.display = "inline";
}

function ButtonSelector(a, b, c, d) {
    document.getElementById("aConverter").className = a;
    document.getElementById("aCalculator").className = b;
    document.getElementById("aYoutube").className = c;
    document.getElementById("aInformation").className = d;
}
var currency = "INR";
var CPT_Min_MaxValue = 300, CPT_Min_CurrentValue = 0, CPT_Max_MaxValue = 450, CPT_Max_CurrentValue = 0;
var firstPressed;
var MinimumCPT = "Minimum Cost Per 1000 Views : ";
var MaximumCPT = "Maximum Cost Per 1000 Views : ";
var operation = "";

function Min_Plus() {
    operation = "+";
    Min_Common_Operation();
    firstPressed = true;
    Max_Common_Operation();
}

function Min_Minus() {
    operation = "-";
    Min_Common_Operation();
    firstPressed = true;
    Max_Common_Operation();
}

function Min_Common_Operation() {
    if (firstPressed == false)
        firstPressed = true;

    if (operation == "+") {
        if (currency == "INR")
            CPT_Min_CurrentValue += 10;
        else
            CPT_Min_CurrentValue += 0.25;
    } else if (operation == "-") {
        if (currency == "INR")
            CPT_Min_CurrentValue -= 10;
        else
            CPT_Min_CurrentValue -= 0.25;
    }

    if (CPT_Min_CurrentValue > 0 && CPT_Min_CurrentValue < CPT_Min_MaxValue) {
        document.getElementById("BtnMin_Plus").Visible = true;
        document.getElementById("BtnMin_Minus").Visible = true;
    }
    else if (CPT_Min_CurrentValue >= CPT_Min_MaxValue) {
        document.getElementById("BtnMin_Plus").Visible = false;
        document.getElementById("BtnMin_Minus").Visible = true;
        CPT_Min_CurrentValue = CPT_Min_MaxValue;
    }
    else if (CPT_Min_CurrentValue <= 0) {
        document.getElementById("BtnMin_Plus").Visible = true;
        document.getElementById("BtnMin_Minus").Visible = false;
        CPT_Min_CurrentValue = 0;
    }

    document.getElementById("TbMinimumCPT").value = MinimumCPT + CPT_Min_CurrentValue + " " + currency;
}


function Max_Plus() {
    operation = "+";
    Max_Common_Operation();
}

function Max_Minus() {
    operation = "-";
    Max_Common_Operation();
}

function Max_Common_Operation() {
    if (operation == "+") {
        if (firstPressed) {
            firstPressed = false;
            CPT_Max_CurrentValue = CPT_Min_CurrentValue;
        }
        if (currency == "INR")
            CPT_Max_CurrentValue += 10;
        else
            CPT_Max_CurrentValue += 0.25;
    } else if (operation == "-") {
        if (currency == "INR")
            CPT_Max_CurrentValue -= 10;
        else
            CPT_Max_CurrentValue -= 0.25;
    }

    if (CPT_Max_CurrentValue > CPT_Min_CurrentValue && CPT_Max_CurrentValue < CPT_Max_MaxValue) {
        document.getElementById("BtnMax_Plus").Visible = true;
        document.getElementById("BtnMax_Minus").Visible = true;
    }
    else if (CPT_Max_CurrentValue >= CPT_Max_MaxValue) {
        document.getElementById("BtnMax_Plus").Visible = false;
        document.getElementById("BtnMax_Minus").Visible = true;
        CPT_Max_CurrentValue = CPT_Max_MaxValue;
    }
    else if (CPT_Max_CurrentValue <= CPT_Min_CurrentValue) {
        document.getElementById("BtnMax_Plus").Visible = true;
        document.getElementById("BtnMax_Minus").Visible = false;
        CPT_Max_CurrentValue = CPT_Min_CurrentValue;
    }

    document.getElementById("TbMaximumCPT").value = MaximumCPT + CPT_Max_CurrentValue + " " + currency;
}


function ddlCurrency_IndexChangedEvent() {
    currency = document.getElementById("ddlCurrency").value;

    if (currency == "AED") {
        CPT_Min_MaxValue = 15;
        CPT_Max_MaxValue = 25;
    }
    else if (currency == "CAD") {
        CPT_Min_MaxValue = 5;
        CPT_Max_MaxValue = 10;
    }
    else if (currency == "USD") {
        CPT_Min_MaxValue = 4;
        CPT_Max_MaxValue = 10;
    }
    else if (currency == "EUR" || currency == "GBP") {
        CPT_Min_MaxValue = 4;
        CPT_Max_MaxValue = 8;
    }
    else if (currency == "INR") {
        CPT_Min_MaxValue = 300;
        CPT_Max_MaxValue = 450;
    }
    else if (currency == "KWD" || currency == "OMR") {
        CPT_Min_MaxValue = 2;
        CPT_Max_MaxValue = 6;
    }
    else {
        currency = "INR";
        CPT_Min_MaxValue = 300;
        CPT_Max_MaxValue = 450;
    }

    CPT_Min_CurrentValue = CPT_Max_CurrentValue = 0;

    firstPressed = false;

    document.getElementById("TbMinimumCPT").value = MinimumCPT + "0 " + currency;
    document.getElementById("TbMaximumCPT").value = MaximumCPT + "0 " + currency;

    document.getElementById("BtnMin_Plus").Visible = true;
    document.getElementById("BtnMax_Plus").Visible = true;

    document.getElementById("BtnMin_Minus").Visible = false;
    document.getElementById("BtnMax_Minus").Visible = false;
}

var IsBtnClearAllClicked = false;
function ClearAll() {
    BtnClearAllClicked = true;
    document.getElementById("TbYouTubeChannelName").value = "";

    document.getElementById("TbTotalVideoViews").value = null;
    document.getElementById("divLblTotalVideoViews").style.display = "none";

    document.getElementById("TbSubtractNoAdViews").value = null;
    document.getElementById("divLblSubtractNoAdViews").style.display = "none";

    document.getElementById("ddlCurrency").value = "INR";
    ddlCurrency_IndexChangedEvent();
    document.getElementById("divResult").style.display = "none";
}

var MinimumRevenue = 1;

function Calculate() {
    var youtubeChannelName = document.getElementById("TbYouTubeChannelName").value;
    var totalViews = parseInt(document.getElementById("TbTotalVideoViews").value);
    var subViews = parseInt(document.getElementById("TbSubtractNoAdViews").value);

    if (youtubeChannelName == "") {
        alert("YouTube Channel Name Required");
        return;
    }
    if (isNaN(totalViews)) {
        alert("Invalid Total Video Views Input, Positive Number Expected");
        return;
    }

    if (isNaN(subViews)) {
        subViews = 0;
    }

    if (subViews > totalViews) {
        alert("Message : Subtract No Ad Views cannot be greater than Total Video Views");
        return;
    }

    var effectiveViews = (totalViews - subViews);
    var minRevenue = parseInt((effectiveViews / Thousand) * CPT_Min_CurrentValue);
    var maxRevenue = parseInt((effectiveViews / Thousand) * CPT_Max_CurrentValue);

    MinimumRevenue = minRevenue;

    document.getElementById("divResult").style.display = "inline";
    document.getElementById("YouTuberChannelName").innerText = youtubeChannelName.toUpperCase();
    document.getElementById("EffectiveViews").innerText = "Effective Views : " + effectiveViews + " Views";
    document.getElementById("EffectiveViewsWords").innerText = "Words : " + NumberToWords(effectiveViews) + " Views";
    document.getElementById("CPTRange").innerText = "CPT Range :: [" + CPT_Min_CurrentValue + " - " + CPT_Max_CurrentValue + "]" + " " + currency;
    document.getElementById("MinRevenue").innerText = "Min Revenue : " + minRevenue + " " + currency;
    document.getElementById("MinRevenueWords").innerText = "Words : " + NumberToWords(minRevenue) + " " + currency;
    document.getElementById("MaxRevenue").innerText = "Max Revenue : " + maxRevenue + " " + currency;
    document.getElementById("MaxRevenueWords").innerText = "Words : " + NumberToWords(maxRevenue) + " " + currency;

    window.scrollTo(0, document.body.scrollHeight);

}

const Thousand = 1000;
const Lakh = 100 * Thousand;
const Million = 10 * Lakh;
const Billion = 1000 * Million;
const Trillion = 1000 * Billion;

function NumberToWords(Value) {

    var originalValue = Value;

    var NoOfTrillion = parseInt((Value / Trillion).noExponents());
    Value -= (NoOfTrillion * Trillion);

    var NoOfBillion = parseInt((Value / Billion).noExponents());
    Value -= (NoOfBillion * Billion);

    var NoOfMillion = parseInt((Value / Million).noExponents());
    Value -= (NoOfMillion * Million);

    var NoOfLakh = parseInt((Value / Lakh).noExponents());
    Value -= (NoOfLakh * Lakh);

    var NoOfThousand = parseInt((Value / Thousand).noExponents());
    Value -= (NoOfThousand * Thousand);

    var word = "";
    if (NoOfTrillion != 0)
        word += NoOfTrillion + " Trillion ";
    if (NoOfBillion != 0)
        word += NoOfBillion + " Billion ";
    if (NoOfMillion != 0)
        word += NoOfMillion + " Million ";
    if (NoOfLakh != 0)
        word += NoOfLakh + " Lakh ";
    if (NoOfThousand != 0)
        word += NoOfThousand + " Thousand";
    if (Value != 0 && originalValue > Thousand)
        word += " and " + Value;
    else if (Value != 0)
        word += Value;

    if (originalValue == 0)
        return "Zero";

    return word;
}

Number.prototype.noExponents = function () {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '', sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}

function TbTotalViews_TextChanged() {
    var inputValue = parseInt(document.getElementById("TbTotalVideoViews").value);

    if (isNaN(inputValue)) {
        document.getElementById("divLblTotalVideoViews").style.display = "inline";
        document.getElementById("LblTotalVideoViews").style.color = "red";
        document.getElementById("LblTotalVideoViews").innerText = "Invalid Input, Positive Number Expected";
    }

    if (IsBtnClearAllClicked) {
        document.getElementById("divLblTotalVideoViews").style.display = "none";
        document.getElementById("LblTotalVideoViews").innerText = "";
        IsBtnClearAllClicked = false;
    }
    else if (toString(inputValue) == "") {
        document.getElementById("divLblTotalVideoViews").style.display = "inline";
        document.getElementById("LblTotalVideoViews").style.color = "red";
        document.getElementById("LblTotalVideoViews").innerText = "Positive Number Required";
    }
    else if (!isNaN(inputValue)) {
        try {
            if (inputValue < 0)
                throw "";
            document.getElementById("divLblTotalVideoViews").style.display = "inline";
            document.getElementById("LblTotalVideoViews").style.color = "green";
            document.getElementById("LblTotalVideoViews").innerText = NumberToWords(inputValue);
            document.getElementById("TbTotalVideoViews").innerText = inputValue;

        } catch (e) {
            document.getElementById("divLblTotalVideoViews").style.display = "inline";
            document.getElementById("LblTotalVideoViews").style.color = "red";
            document.getElementById("LblTotalVideoViews").innerText = "Invalid Input, Positive Number Expected";
        }
    }
}

function TbSubtractNoAdViews_TextChanged() {
    var inputValue = parseInt(document.getElementById("TbSubtractNoAdViews").value);

    if (isNaN(inputValue)) {
        document.getElementById("divLblSubtractNoAdViews").style.display = "none";
    }
    else if (!isNaN(inputValue)) {
        try {
            if (inputValue < 0)
                throw "";
            document.getElementById("divLblSubtractNoAdViews").style.display = "inline";
            document.getElementById("LblSubtractNoAdViews").style.color = "green";
            document.getElementById("LblSubtractNoAdViews").innerText = NumberToWords(inputValue);
            document.getElementById("TbSubtractNoAdViews").innerText = inputValue;

        } catch (e) {
            document.getElementById("divLblSubtractNoAdViews").style.display = "inline";
            document.getElementById("LblSubtractNoAdViews").style.color = "red";
            document.getElementById("LblSubtractNoAdViews").innerText = "Invalid Input, Positive Number Expected";
        }
    }
}
