from PIL import Image

img = Image.open('/home/metin/.gemini/antigravity/brain/db710ad8-fa7f-45d1-aeca-748c14d6cfba/artifacts/debug_layout.png')
rgb_img = img.convert('RGB')
width, height = img.size

print("Checking bounding box for gray borders of the components.")
def find_box(y_start, y_end):
    l_min, r_max = width, 0
    bg_color = (255, 255, 255)
    for y in range(y_start, y_end):
        for x in range(width):
            r,g,b = rgb_img.getpixel((x,y))
            # Card borders are gray-ish, background is maybe different or white?
            # actually if the background is gray, the cards are white.
            # let's just find the left-most and right-most white pixels.
            if r > 240 and g > 240 and b > 240:
                if x < l_min: l_min = x
                if x > r_max: r_max = x
    return l_min, r_max

print(f"Top Grid (400-500): {find_box(400, 500)}")
print(f"Categories Bar (650-700): {find_box(650, 700)}")
print(f"Manufacturer Card (800-900): {find_box(800, 900)}")
