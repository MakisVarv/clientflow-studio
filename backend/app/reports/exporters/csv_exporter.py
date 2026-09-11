from io import StringIO
import csv


class CsvExporter:

    @staticmethod
    def export(data):

        buffer = StringIO()

        writer = csv.writer(buffer)

        writer.writerow(["Field", "Value"])

        for key, value in data.items():

            writer.writerow([key, value])

        buffer.seek(0)

        return buffer
