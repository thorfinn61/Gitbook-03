def nebula_compressor(operation: str, data: str) -> str:
    if operation == "compress":
        result = ""
        i = 0
        while i < len(data):
            count = 1
            while i + count < len(data) and data[i + count] == data[i]:
                if count == 9:
                    break
                count += 1
            result += data[i] + (str(count) if count > 1 else "")
            i += count
        return result

    elif operation == "decompress":
        result = ""
        i = 0
        while i < len(data):
            char = data[i]
            i += 1
            digits = ""
            while i < len(data) and data[i].isdigit():
                digits += data[i]
                i += 1
            result += char * int(digits or 1)
        return result
    else:
        return "Error"