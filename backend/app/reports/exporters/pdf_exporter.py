from io import BytesIO

from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph
from reportlab.platypus import SimpleDocTemplate


class PdfExporter:

    @staticmethod
    def export(title, data):

        buffer = BytesIO()

        document = SimpleDocTemplate(buffer)

        styles = getSampleStyleSheet()

        elements = []

        elements.append(
            Paragraph(
                f"<b>{title}</b>",
                styles["Heading1"],
            )
        )

        elements.append(Paragraph("<br/><br/>", styles["Normal"]))

        for key, value in data.items():

            elements.append(
                Paragraph(
                    f"<b>{key}</b> : {value}",
                    styles["Normal"],
                )
            )

        document.build(elements)

        buffer.seek(0)

        return buffer
