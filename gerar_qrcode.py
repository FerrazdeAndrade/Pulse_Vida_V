import os
import qrcode

# Link da sua aplicação na Netlify
url_site = "https://pulsevidav.netlify.app"

qr = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=10, border=4)
qr.add_data(url_site)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")

# Garante que a pasta 'imagens' existe antes de salvar
pasta = "imagens"
os.makedirs(pasta, exist_ok=True)

# Caminho completo para salvar o ficheiro
caminho = os.path.join(pasta, "qrcode_pulse_vida.png")
img.save(caminho)

print("QR Code gerado e guardado com sucesso na pasta 'imagens'!")