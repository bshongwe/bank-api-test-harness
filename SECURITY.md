# Security Policy

## Intended Use

This test harness is designed for **testing against mock APIs only**. It should never be used against production banking systems without explicit written authorization.

## Reporting Security Issues

If you discover a security vulnerability or potential for abuse, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer directly (see package.json for contact)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact

## Scope

This tool is provided "as-is" for educational and testing purposes. Users are responsible for:
- Ensuring compliance with applicable laws and regulations
- Obtaining proper authorization before testing any systems
- Not using real credentials or customer data
- Following responsible disclosure practices

## Rate Limiting

Tests are intentionally limited to:
- 1 virtual user by default
- 30-second duration
- 0.5-second delays between requests

**Do not modify these limits** when testing against shared or production-like environments without authorization.

## Disclaimer

The maintainers are not responsible for misuse of this tool. By using this software, you agree to use it only against authorized test environments.
