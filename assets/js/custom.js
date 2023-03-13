addEventListener("resize", () => {
    width = document.body.clientWidth;
    myFunction(width)
});


function myFunction(width = null) {
    width = document.body.clientWidth;
    if (width < 1208) {
        var siteNav = document.getElementById('mainmenu');
        siteNav.classList.add("d-none");
        var toggleBtn = document.getElementById('toggleBtn');
        toggleBtn.classList.remove('d-none')
    }
    if (width > 1208) {
        var siteNav = document.getElementById('mainmenu');
        siteNav.classList.remove("d-none");
        var toggleBtn = document.getElementById('toggleBtn');
        toggleBtn.classList.add('d-none')
    }
};

(function() {
    myFunction()
})();


document.getElementById("toggleBtn").addEventListener("click", function() {
    var btn = document.getElementById('responsiveMenu')
    btn.classList.toggle("d-none")
});

// --------
// --------
// --------

var h = document.getElementById("navigationSection");
var readout = document.querySelector("#navigationSection");
var stuck = false;
var stickPoint = getDistance();
var index = "z-index";

function getDistance() {
    var topDist = h.offsetTop;
    return topDist;
}

window.onscroll = function(e) {
    var distance = getDistance() - window.pageYOffset;
    var offset = window.pageYOffset;
    if ((distance <= 0) && !stuck) {
        h.style.position = 'fixed';
        h.style.top = '0px';
        h.style.width = '100%';
        stuck = true;
    } else if (stuck && (offset <= stickPoint)) {
        h.style.position = 'relative';
        stuck = false;
    }
    // --------
    // --------
    // --------
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll("#mainmenu ul li a");
    var current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute("id");
        }
        // console.log("section", current)
    });

    navLi.forEach((a) => {
        a.classList.remove("active");
        if (a.classList.contains(current)) {
            a.classList.add("active");

        }

    });
}

document.addEventListener("scroll", (event) => {
    var current = window.scrollY;
    console.log(current)

    if (current > 700) {
        const data = document.querySelectorAll(".bannerSection");
        // data.classList.remove("currrent");
        data.forEach((d) => {
            if (d.classList.contains('bannerSection')) {
                d.classList.remove("currrent");
            }

        })
    }
    if (current < 700) {
        const data = document.querySelectorAll(".bannerSection");
        // data.classList.remove("currrent");
        data.forEach((d) => {
            if (d.classList.contains('bannerSection')) {
                d.classList.add("currrent");
            }

        })
    }
});


// Counter
// =======================================================
VanillaCounter()

function VanillaCounter() {
    let elements = document.querySelectorAll('[data-vanilla-counter]')
    elements.forEach(i => {
        let data = {
            startAt: parseInt(i.getAttribute('data-start-at')),
            endAt: parseInt(i.getAttribute('data-end-at')),
            delay: parseInt(i.getAttribute('data-delay')) || 0,
            format: '{}',
            time: parseInt(i.getAttribute('data-time')) || 1000
        }
        if (i.getAttribute('data-format')) {
            data.format = i.getAttribute('data-format')
        } else if (i.innerHTML != "") {
            data.format = i.innerHTML
        }
        console.log(data.format)
        if (data.startAt == null) {
            throw new Error('data-start-at attribute is required')
        }
        if (data.endAt == null) {
            throw new Error('data-end-at attribute is required')
        }
        var counter = data.startAt
        i.innerHTML = data.format.replace('{}', counter)
        var intervalTime = Math.ceil(data.time / (data.endAt - data.startAt))
        setTimeout(() => {
            var interval = setInterval(intervalHandler, intervalTime)

            function intervalHandler() {
                counter += (data.endAt - data.startAt) / Math.abs(data.endAt - data.startAt) * 1
                i.innerHTML = data.format.replace('{}', counter)
                if (counter == data.endAt) {
                    clearInterval(interval)
                }
            }
        }, data.delay)
    })
}

window.VanillaCounter = VanillaCounter