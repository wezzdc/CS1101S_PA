﻿//===============================================================
// Task 3A: Smallest Bounding Rectangle
//===============================================================

//--------------------
// SOLUTION
//--------------------
// Feel free to use these functions:
const get_x = (aar) => list_ref(aar, 0);
const get_y = (aar) => list_ref(aar, 1);
const get_width = (aar) => list_ref(aar, 2);
const get_height = (aar) => list_ref(aar, 3);

function smallest_bounding_AAR_area(rs) {
    let min_x = Infinity;
    let min_y = Infinity;
    let max_x = -Infinity;
    let max_y = -Infinity;

    for (let p = rs; !is_null(p); p = tail(p)) {
        const aar = head(p);
        const x1 = get_x(aar);
        const x2 = x1 + get_width(aar);
        const y1 = get_y(aar);
        const y2 = y1 + get_height(aar);

        if (x1 < min_x) { min_x = x1; } else { }
        if (x2 > max_x) { max_x = x2; } else { }
        if (y1 < min_y) { min_y = y1; } else { }
        if (y2 > max_y) { max_y = y2; } else { }
    }
    return (max_x - min_x) * (max_y - min_y);
}

//--------------------
// TESTCASES (PUBLIC)
//--------------------
display(
equal( 150,
       smallest_bounding_AAR_area(
            list( list(2, 3, 10, 15) ) ) ),
"3A_1:");

display(
equal( 300,
       smallest_bounding_AAR_area(
            list( list(2, 3, 10, 15),
                  list(1, 4, 20, 8) ) ) ),
"3A_2:");

//--------------------
// TESTCASES (PRIVATE)
//--------------------
display(
equal( 2881,
       smallest_bounding_AAR_area(
            list( list(25, 40, 67, 43) ) ) ),
"3A_P1:");

display(
equal( 6700,
       smallest_bounding_AAR_area(
            list( list(25, 40, 67, 43), list(41, 20, 16, 100) ) ) ),
"3A_P2:");

display(
equal( 15900,
       smallest_bounding_AAR_area(
            list( list(25, 40, 67, 43), list(99, 49, 27, 13),
                  list(10, 70, 52, 37), list(70, 26, 99, 50),
                  list(41, 47, 23, 19), list(41, 20, 16, 100) ) ) ),
"3A_P3:");

//===============================================================




//===============================================================
// Task 3B: Optimized Smallest Bounding Rectangle
//===============================================================

// Feel free to use these functions:
// const get_x = (aar) => list_ref(aar, 0);
// const get_y = (aar) => list_ref(aar, 1);
// const get_width = (aar) => list_ref(aar, 2);
// const get_height = (aar) => list_ref(aar, 3);

//--------------------
// SOLUTION
//--------------------
function optimized_smallest_bounding_AAR_area(rs) {
    let max_longer = 0;
    let max_shorter = 0;

    for (let p = rs; !is_null(p); p = tail(p)) {
        const aar = head(p);
        const width = get_width(aar);
        const height = get_height(aar);
        const longer = math_max(width, height);
        const shorter = math_min(width, height);

        if (longer > max_longer) { max_longer = longer; } else { }
        if (shorter > max_shorter) { max_shorter = shorter; } else { }
    }
    return max_longer * max_shorter;
}

//--------------------
// TESTCASES (PUBLIC)
//--------------------
display(
equal( 150,
       optimized_smallest_bounding_AAR_area(
            list( list(2, 3, 10, 15) ) ) ),
"3B_1:");

display(
equal( 200,
       optimized_smallest_bounding_AAR_area(
            list( list(2, 3, 10, 15),
                  list(1, 4, 20, 8) ) ) ),
"3B_2:");

//--------------------
// TESTCASES (PRIVATE)
//--------------------
display(
equal( 2881,
       optimized_smallest_bounding_AAR_area(
            list( list(25, 40, 67, 43) ) ) ),
"3B_P1:");

display(
equal( 4300,
       optimized_smallest_bounding_AAR_area(
            list( list(25, 40, 67, 43), list(41, 20, 16, 100) ) ) ),
"3B_P2:");

display(
equal( 5000,
       optimized_smallest_bounding_AAR_area(
            list( list(25, 40, 67, 43), list(99, 49, 27, 13),
                  list(10, 70, 52, 37), list(70, 26, 99, 50),
                  list(41, 47, 23, 19), list(41, 20, 16, 100) ) ) ),
"3B_P3:");

//===============================================================




//===============================================================
// Task 3C: Overlapping Rectangles
//===============================================================

// Feel free to use these functions:
// const get_x = (aar) => list_ref(aar, 0);
// const get_y = (aar) => list_ref(aar, 1);
// const get_width = (aar) => list_ref(aar, 2);
// const get_height = (aar) => list_ref(aar, 3);

//--------------------
// SOLUTION 1
//--------------------
function overlap_area(aar1, aar2) {

    // [a, b] and [c, d] are the input intervals.
    function overlap_length(a, b, c, d) {
        return math_max(0, math_min(b, d) - math_max(a, c));
    }

    const x_overlap = overlap_length(
                        get_x(aar1), get_x(aar1) + get_width(aar1),
                        get_x(aar2), get_x(aar2) + get_width(aar2));

    const y_overlap = overlap_length(
                        get_y(aar1), get_y(aar1) + get_height(aar1),
                        get_y(aar2), get_y(aar2) + get_height(aar2));

    return x_overlap * y_overlap;
}

//--------------------
// SOLUTION 2
//--------------------
/*
function overlap_area(aar1, aar2) {

    // [a, b] and [c, d] are the input intervals.
    function overlap_length(a, b, c, d) {
        if (c < a) {
            return overlap_length(c, d, a, b); // to make sure a <= c
        } else if (b <= c) {
            return 0;     // when a < b <= c < d
        } else if (b <= d) {
            return b - c; // when a <= c < b <= d
        } else {
            return d - c; // when a <= c < d <= b
        }
    }
    const x_overlap = overlap_length(
                        get_x(aar1), get_x(aar1) + get_width(aar1),
                        get_x(aar2), get_x(aar2) + get_width(aar2));

    const y_overlap = overlap_length(
                        get_y(aar1), get_y(aar1) + get_height(aar1),
                        get_y(aar2), get_y(aar2) + get_height(aar2));

    return x_overlap * y_overlap;
}
*/

//--------------------
// TESTCASES (PUBLIC)
//--------------------
display(
equal( 0, overlap_area( list(10, 20, 30, 60), list(40, 10, 50, 15) ) ),
"3C_1:");

display(
equal( 150, overlap_area( list(10, 20, 30, 60), list(10, 10, 50, 15) ) ),
"3C_2:");

display(
equal( 450, overlap_area( list(10, 20, 30, 60), list(0, 40, 50, 15) ) ),
"3C_3:");

display(
equal( 75, overlap_area( list(10, 20, 30, 60), list(-25, 75, 50, 15) ) ),
"3C_4:");

//--------------------
// TESTCASES (PRIVATE)
//--------------------
display(
equal( 0, overlap_area( list(25, 40, 67, 43), list(99, 49, 27, 13) ) ),
"3C_P1:");

display(
equal( 481, overlap_area( list(25, 40, 67, 43), list(10, 70, 52, 37) ) ),
"3C_P2:");

display(
equal( 792, overlap_area( list(25, 40, 67, 43), list(70, 26, 99, 50) ) ),
"3C_P3:");

display(
equal( 2881, overlap_area( list(25, 40, 67, 43), list(1, 3, 900, 700) ) ),
"3C_P4:");

display(
equal( 437, overlap_area( list(25, 40, 67, 43), list(41, 47, 23, 19) ) ),
"3C_P5:");

display(
equal( 688, overlap_area( list(25, 40, 67, 43), list(41, 20, 16, 100) ) ),
"3C_P6:");

//===============================================================
