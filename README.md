# Why Does This Exist
Let's say you have a taiko map, and you want to have a gradual SV change over the course of however many beats.

You could either create however many timing points and set the SV multipliers by hand... or instead you can use osvgen!

# Tutorial/Example
Below I have a map where I want to create an SV gradient between two timing points:

![alt text](<screenshots/スクリーンショット 2024-04-25 204631.png>)

We'll want to open up the `.osu` file for the beatmap to get timing point information:

![alt text](<screenshots/スクリーンショット 2024-04-25 204706.png>)

![alt text](<screenshots/スクリーンショット 2024-04-25 204822.png>)

We can copy these lines into the first two boxes of osvgen ([http://seenry.github.io/osvgen](http://seenry.github.io/osvgen)).

By default, osvgen will take us from 1.00x to 2.00x speed. You can change these if you want, but for this example, the default will do.

For my beatmap, there are (28 + 1/4) measures from timing point 1 to timing point 2. Since I'm using 1/4 snapping there are (28 + 1/4) * 4 = 113 beats meaning I will want to insert 113 - 2 = 111 timing points (-2 because we already have our first and last timing points).

The offset gets applied to every timing point (I made it -3 so that even if there are small rounding errors, the timing point will come before the note). An exception is when the first timing point is uninherited in which case no offset is applied to the first timing point.

![alt text](<screenshots/スクリーンショット 2024-04-25 204914.png>)

We can copy the output and **replace** the two timing points in the `.osu` file

![alt text](<screenshots/スクリーンショット 2024-04-25 205129.png>)

After saving, if we reload our map, we can see our timing points have been added~

![alt text](<screenshots/スクリーンショット 2024-04-25 205655.png>)

## Final Notes
Hopefully this is useful to some people. If you run into any issues, feel free to create a github issue for it and I'll help/fix things if I can lol.

Happy mapping!
