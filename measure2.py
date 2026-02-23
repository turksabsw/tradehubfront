from PIL import Image

img = Image.open('/home/metin/.gemini/antigravity/brain/db710ad8-fa7f-45d1-aeca-748c14d6cfba/media__1771582810602.png')
rgb_img = img.convert('RGB')
w, h = img.size

# The image is 1024x304
# Let's print the right-most background pixel on each line, where "background" means the color between the cards: this color is likely the #f8f8f8 or similar
# Wait, let's just find the first pixel from the right that is NOT the background color.

# Background color in the screenshot seems to be very light gray (e.g., F5F5F5 or F8F8F8)
# Let's sample a pixel from the very right edge (e.g. at x=1023, y=10) assuming it's background
bg_color = rgb_img.getpixel((1023, 10))
print(f"Assumed bg color from (1023, 10): {bg_color}")

for y in [20, 100, 150, 200, 250, 280]:
    rightmost = 0
    for x in range(w-1, 0, -1):
        r, g, b = rgb_img.getpixel((x, y))
        diff = abs(r-bg_color[0]) + abs(g-bg_color[1]) + abs(b-bg_color[2])
        if diff > 10: # not background
            rightmost = x
            break
    print(f"Row {y:3d}: rightmost non-bg at {rightmost:4d}. Color: {rgb_img.getpixel((rightmost, y))}")

